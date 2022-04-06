import React from 'react'
import { firestore } from '../firebase'
import { Market } from '../types/markets/market.interface'

export default function useMarkets() {
  const [marketDocs, setMarketDocs] = React.useState<Market[]>(null)

  React.useEffect(() => {
    const ref = firestore.collection('markets').orderBy('name')
    const unsubscribe = ref.onSnapshot((snapshot) => {
      const docs = snapshot.docs

      const formatedMarktes: Market[] = []
      for (const doc of docs) {
        const market = doc.data() as Market
        if (market.isHidden) continue
        formatedMarktes.push(market)
      }
      formatedMarktes.sort((a, b) => b.ranking - a.ranking)

      setMarketDocs(formatedMarktes)
    })

    return unsubscribe
  }, [])

  return marketDocs
}
