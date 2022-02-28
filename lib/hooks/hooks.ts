import React from 'react'
import { DocumentSnapshot, FirestoreError } from 'firebase/firestore'
import { useLoadingValue } from 'react-firebase-hooks/auth/dist/util'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { Banner, HomeBanners } from '../../interfaces/banners/banner.interface'
import { firestore } from '../firebase'

export function useDocumentDataSSR<T>(
  ref,
  options
): [T, boolean, FirestoreError] {
  const [value, loading, error] = useDocumentData<T>(ref, options)

  if (options?.startWith && loading) {
    return [options.startWith, loading, error]
  } else {
    return [value, loading, error]
  }
}

const bannersInitialValue = (): HomeBanners => ({
  lead: [],
  others: [],
})

export function useBanners() {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    HomeBanners,
    FirestoreError
  >()
  // const [banners, setBanners] = React.useState()

  React.useEffect(() => {
    let unsubscribe
    unsubscribe = firestore.collection('banners').onSnapshot(
      (item) => {
        const options = bannersInitialValue()
        for (let i = 0; i < item.docs.length; i++) {
          const data = item.docs[i].data() as Banner

          if (data.type === 'lead') {
            options.lead.push(data)
            continue
          }

          options.others.push(data)
        }
        options.lead.sort((a, b) => b.priority - a.priority)

        setValue(options)
      },
      (error: FirestoreError) => setError(error)
    )

    return unsubscribe
  }, [setError, setValue])

  return { value, loading, error }
}
