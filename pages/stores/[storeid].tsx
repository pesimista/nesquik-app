import { useRouter } from "next/router"
import Image from "next/image"
import React from "react"
import Loader from "../../components/Loader"
import { Market } from "../../interfaces/markets/market.interface"
import { firestore } from "../../lib/firebase"

import styles from '../../styles/store-details.module.scss'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/quick-3909f.appspot.com/o/images%2F1604004828844_Avatar.gif?alt=media&token=67bb951e-7087-4913-a07d-2f7fe6d91586'

function useMarket(marketID): Market {
  const [market, setMarket] = React.useState<Market>(null)
  const router = useRouter()

  React.useEffect(() => {
    let unsubscribe

    if (!marketID) {
      router.back()
    }

    const ref = firestore.collection('markets').doc(marketID)
    ref.get().then(doc => {
      if (!doc.exists) {
        router.back()
      }
    })

    unsubscribe = ref.onSnapshot((doc) => {
      setMarket(doc.data() as Market)
    })

    return unsubscribe
  }, [marketID, router])

  return market
}

export default function StoreDetails(props) {
  const router = useRouter()
  const { storeid } = router.query
  const market = useMarket(storeid)

  if (!market) {
    return <Loader loading={true} />
  }
  console.log(market)
  return (
    <div className={styles['market-header']}>
      <h2>{market.name}</h2>
      <div className={styles['image-wrapper']}>
        <Image className={styles['market-logo']} src={market.images.profile || defaultImage} alt={market.name} width={90} height={90} />
      </div>
    </div>
  )
}