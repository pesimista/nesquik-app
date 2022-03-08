import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar({
  showMenu = false,
  onMenuClick,
  visibility = false,
  showBack = false,
  showCart = true,
}) {
  const iconClassname = {
    className: 'text-green-1000',
    style: { fontSize: '24px' },
  }

  const router = useRouter()
  const icon = visibility ? (
    <CloseOutlined {...iconClassname} />
  ) : (
    <MenuOutlined {...iconClassname} />
  )
  const redirectTo = showMenu ? '/home' : '/'

  return (
    <nav
      className='relative flex justify-between items-center h-16 bg-gray-1000 p-5'
      style={{ zIndex: '10000' }}
    >
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center justify-center w-9 h-9'>
          {showMenu && !showBack ? (
            <button onClick={onMenuClick} className='p-0 font-bold w-9'>
              {icon}
            </button>
          ) : null}

          {showBack ? (
            <button
              onClick={router.back}
              className='p-0 font-bold w-9 h-8 relative'
            >
              <Image src='/images/chevron-back.svg' alt='back' layout='fill' />
            </button>
          ) : null}
        </div>
        <Link href={redirectTo} passHref>
          <div className='ml-1 inline-block' style={{ height: '35px' }}>
            <Image
              src='/images/quik-logo.svg'
              width={137}
              height={35}
              alt='quik-logo'
            />
          </div>
        </Link>
        <div className='flex items-center'>
          {showCart ? (
            <Image src='/images/cart.svg' alt='cart' width={40} height={40} />
          ) : (
            <Link href='/login' passHref>
              <Button shape='round'>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
