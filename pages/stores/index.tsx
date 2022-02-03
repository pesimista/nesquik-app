import Link from "next/link"
import React from "react"
import { Market } from "../../interfaces/markets/market.interface"
import { firestore } from "../../lib/firebase"


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

  return <div>
    <h2>Stores showcase</h2>
    <ul>
      {marketItems}
    </ul>
  </div>
}