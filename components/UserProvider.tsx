import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { UserContext } from "../lib/context"
import { auth, firestore } from "../lib/firebase"
import Loader from "./Loader"

export function UserProvider({ children }) {
  const [user, loadingUser] = useAuthState(auth as any)
  const [userDoc, setDoc] = React.useState(null)

  React.useEffect(() => {
    let unsubscribe

    if (user) {
      const ref = firestore.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        setDoc(doc.data())
      })
    } else {
      setDoc(null)
    }

    return unsubscribe
  }, [user])

  return (
    <UserContext.Provider value={{ user, userDoc, loadingUser}}>
      <Loader loading={loadingUser}>
        {children}
      </Loader>
    </UserContext.Provider>
  )
}