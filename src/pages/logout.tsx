import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.push('/')
    })
  }, [router])

  return <>Redirecting</>
}
