import { useRouter } from 'next/router'
import React from 'react'
import { firestore } from '../firebase'
import { normalize } from '../helpers/string'
import { MarketCategory } from '../types/markets/categories.type'
import { Market } from '../types/markets/market.interface'

export function useMarkets() {
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

export function useSingleMarket(marketID, startWith): Market {
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

export default function useMarketCategories(
  marketID: string
): MarketCategory[] {
  const [categories, setCategories] = React.useState<MarketCategory[]>([])
  React.useEffect(() => {
    if (!marketID) {
      return
    }

    const ref = firestore
      .collection('marketCategories')
      .where('marketID', '==', marketID)

    ref.get().then((collection) => {
      const res = collection.docs.map((item) => item.data() as MarketCategory)

      res.sort((a, b) => b.order - a.order)
      setCategories(res)
    })
  }, [marketID])

  return categories
}

export function useFilterByCategory<T>(docs: T[], key: string) {
  // const productsDocs = useMarketProducts(marketID)
  const [collection, setCollection] = React.useState<T[]>([])
  const [filter, setFilter] = React.useState<string>('')
  const [category, setCategory] = React.useState<Partial<MarketCategory>>(null)

  React.useEffect(() => {
    if (!filter && !category) {
      setCollection(docs)
      return
    }

    const normalizedFilter = normalize(filter)

    const regex = new RegExp(`(${normalizedFilter})`, 'ig')

    const filtered = docs.filter((item) => {
      const categories = item[key]?.categoriesDescriptions
        .map((cat) => cat.name)
        .join(' ')

      const criteria = normalize(item['name'] + ' ' + categories)

      if (filter && !regex.test(criteria)) {
        return false
      }

      if (category && item[key]) {
        const hasCategory = item[key].categoriesDescriptions.some(
          (cat) => cat.categoryID === category.categoryID
        )

        return hasCategory
      }

      return true
    })

    setCollection(filtered)
  }, [category, filter, docs, key])

  return { collection, setFilter, filter, category, setCategory }
}
