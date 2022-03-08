import { collection, FirestoreError } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Banner, HomeBanners } from '../types/banners/banner.type'
import { firestore } from '../firebase'
import { parseURL } from '../helpers'

type BannersHook = {
  value: HomeBanners
  loading: boolean
  error: FirestoreError
}

const bannersInitialValue = (): HomeBanners => ({
  lead: [],
  promo: [],
  category: [],
  others: [],
})

export function useBanners(): BannersHook {
  const [documents, loading, error] = useCollectionData(
    collection(firestore, 'banners')
  )
  const value = bannersInitialValue()

  if (loading) {
    return { value, loading, error }
  }

  for (const item of documents) {
    const data = { ...item } as Banner
    data.url = parseURL(data.url)
    if (!data.isHidden && data.type && value[data.type]) {
      value[data.type].push(data)
      continue
    }

    value.others.push(data)
  }

  for (const key in value) {
    value[key].sort((a, b) => b.priority - a.priority)
  }

  return { value, loading, error }
}
