import { useRouter } from 'next/router'
import Image from 'next/image'
import React from 'react'
import Loader from '../../components/Loader'
import { Market } from '../../lib/types/markets/market.interface'
import { firestore } from '../../lib/firebase'

import styles from '../../styles/store-details.module.scss'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { defaultDesc, defaultImage } from '../../lib/helpers'

function useMarket(marketID, startWith): Market {
  const [market, setMarket] = React.useState<Market>(startWith ?? null)
  const router = useRouter()

  React.useEffect(() => {
    if (!marketID) {
      router.back()
    }

    const ref = firestore.collection('markets').doc(marketID)
    ref.get().then((doc) => {
      if (!doc.exists) {
        router.back()
      }
    })

    const unsubscribe = ref.onSnapshot((doc) => {
      setMarket(doc.data() as Market)
    })

    return unsubscribe
  }, [marketID, router])

  return market
}

export default function StoreDetails(props) {
  const router = useRouter()
  const { storeid } = router.query
  const market = useMarket(storeid, props.item)

  if (!market) {
    return <Loader loading={true} />
  }

  const image = market.images.profile || defaultImage
  const title = `Nesquik - ${market.name} `
  const description = market.address
    ? `Pide en ${market.name} por QUIK, desde ${market.address} hasta donde tu quieras! `
    : ''
  const descContent = `${description}${defaultDesc}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='title' content={title} />
        <meta name='description' content={descContent} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://quikpago.com/' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={descContent} />
        <meta property='og:image' content={image} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://quikpago.com/' />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={descContent} />
        <meta property='twitter:image' content={image} />
      </Head>
      <div className={styles['market-header']}>
        <h2>{market.name}</h2>
        <div className={styles['image-wrapper']}>
          <Image
            className={styles['market-logo']}
            src={image}
            alt={market.name}
            width={90}
            height={90}
          />
        </div>
      </div>
    </>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await firestore.collection('markets').orderBy('name').get()
  const paths = snapshot.docs.map((doc) => {
    const data = doc.data() as Market
    return {
      params: { storeid: data.marketID },
    }
  })

  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const marketId = params.storeid as string
  const doc = await firestore.collection('markets').doc(marketId).get()
  const market = doc.data() as Market

  delete market.troubles
  delete market.payments
  delete market.geolocation

  return { props: { market } }
}
