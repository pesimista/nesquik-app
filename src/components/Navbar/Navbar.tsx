import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Button } from '~/components/ui/button'

export default function Navbar({
  onMenuClick,
  showBack = false,
}: Record<string, any>) {
  const { status } = useSession()

  const router = useRouter()

  const leftButton = useMemo(() => {
    if (status === 'loading') {
      return <></>
    }

    if (status === 'authenticated') {
      return (
        <Button variant='link'>
          <Image src='/images/cart.svg' alt='cart' width={32} height={32} />
        </Button>
      )
    }

    return <Button onClick={() => signIn('auth0')}>Login</Button>
  }, [status])

  return (
    <nav
      className='fixed w-full flex justify-between items-center h-16 bg-purple-950 p-5'
      style={{ zIndex: '10000' }}
    >
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center justify-center w-9 h-9'>
          <Button onClick={onMenuClick} size='sm'>
            Pa tras
          </Button>

          {showBack ? (
            <button
              onClick={router.back}
              className='p-0 font-bold w-9 h-8 relative'
            >
              <Image src='/images/chevron-back.svg' alt='back' layout='fill' />
            </button>
          ) : null}
        </div>

        <Link href='/' passHref>
          <div className='ml-1 inline-block h-9 relative'>
            <Image
              src='/images/quik-logo.svg'
              width={141}
              height={36}
              alt='quik-logo'
            />
          </div>
        </Link>

        <div className='flex items-center'>{leftButton}</div>
      </div>
    </nav>
  )
}
