import { useSession } from 'next-auth/react'
import { Button } from '~/components/ui/button'
import { logout } from '~/lib/utils'

export default function Home() {
  const session = useSession()

  return (
    <>
      something
      <Button onClick={() => logout(session.data)}>Sign out</Button>
    </>
  )
}

// <>
//   <p>{JSON.stringify(session, null, 2)}</p>

//   <div className='flex gap-2'>
//     <Badge variant='secondary'>something somerthing</Badge>
//     <Button onClick={() => signIn('auth0')}>Sign in</Button>
//   </div>
// </>
