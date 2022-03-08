import { useRouter } from 'next/router'
import React from 'react'

export const initialValue = { user: null, doc: null }
export const UserContext = React.createContext(null)

export function useUser() {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be called within a userProvider')
  }

  return context
}

export function useRequiredUser() {
  const router = useRouter()
  const context = useUser()
  const { loadingUser, user } = context || {}

  React.useEffect(() => {
    if (!loadingUser && !user) {
      router.push('/')
    }
  }, [loadingUser, router, user])

  return context
}
