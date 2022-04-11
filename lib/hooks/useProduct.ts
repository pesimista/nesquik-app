import React from 'react'
import { firestore } from '../firebase'
import { Product } from '../types/products/product.interface'

const defaultMarketCategories: Product['marketCategories'] = {
  ids: ['somebaseid'],
  categoriesDescriptions: [
    {
      marketID: '',
      order: -1,
      name: 'Otros',
      categoryID: '',
      image: '',
      schedule: [],
      affiliateID: '',
    },
  ],
}

function addDefaults(prod: Product): Product {
  prod.marketCategories = Boolean(
    prod.marketCategories?.categoriesDescriptions?.length
  )
    ? prod.marketCategories
    : defaultMarketCategories

  return prod
}

export function useMarketProducts(marketID: string): Product[] {
  const [products, setProducts] = React.useState<Product[]>([])
  React.useEffect(() => {
    if (!marketID) {
      return
    }

    const ref = firestore
      .collection('products')
      .where('marketID', 'array-contains', marketID)

    ref.get().then((collection) => {
      const res = collection.docs.reduce((col, item) => {
        const data = item.data() as Product
        if (data.isAvailable === false) {
          return col
        }

        return [...col, addDefaults(data)]
      }, [])

      res.sort((a, b) => b.priority - a.priority)
      setProducts(res)
    })
  }, [marketID])

  return products
}

export function useProduct(productID): Product {
  const [product, setProduct] = React.useState<Product>(null)

  React.useEffect(() => {
    const ref = firestore.collection('products').doc(productID)

    const unsubscribe = ref.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        return
      }

      const data = snapshot.data() as Product

      setProduct(addDefaults(data))
    })

    return unsubscribe
  }, [productID])

  return product
}
