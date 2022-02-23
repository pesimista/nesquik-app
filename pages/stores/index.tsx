import Head from "next/head"
import Link from "next/link"
import React from "react"
import { Market } from "../../interfaces/markets/market.interface"
import { firestore } from "../../lib/firebase"
import { defaultDesc, defaultImage } from "../../lib/helpers"


function useMarkets() {
  const [markets, setMarkets] = React.useState(null)

  React.useEffect(() => {
    let unsubscribe

    const ref = firestore.collection('markets').orderBy('name')
    unsubscribe = ref.onSnapshot((snapshot) => {
      const docs = snapshot.docs

      const formatedMarktes = []
      for (const doc of docs) {
        const market = doc.data() as Market
        if (market.isHidden) continue
        formatedMarktes.push(market)
      }

      setMarkets(formatedMarktes)
    })

    return unsubscribe
  }, [])

  return markets
}

export default function StoresShowcase() {
  const markets = useMarkets()

  const marketItems = markets?.map(item => {
    return (
      <Link href={`/stores/${item.marketID}`} passHref key={item.marketID}>
        <li >{item.name} | {item.marketID}</li>
      </Link>
    )
  })

  return (
    <>
      <Head>
        <title>Nesquik - Stores</title>
        <meta name='title' content='>Nesquik - Stores' />
        <meta
          name='description'
          content={defaultDesc}
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://quikpago.com/' />
        <meta property='og:title' content='>Nesquik - Stores' />
        <meta property='og:description' content={defaultDesc} />
        <meta property='og:image' content={defaultImage} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://quikpago.com/' />
        <meta property='twitter:title' content='>Nesquik - Stores' />
        <meta property='twitter:description' content={defaultDesc} />
        <meta property='twitter:image' content={defaultImage} />
      </Head>
      <div>
        <h2>Stores showcase</h2>
        <ul>
          {marketItems}
        </ul>
      </div>
    </>
  )
}