import { MenuOutlined, CloseOutlined, BackwardFilled } from '@ant-design/icons'
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
  const router = useRouter()
  const icon = visibility ? (
    <CloseOutlined style={{ fontSize: '24px' }} className='text-green-1000' />
  ) : (
    <MenuOutlined style={{ fontSize: '24px' }} className='text-green-1000' />
  )
  const redirectTo = showMenu ? '/home' : '/'

  return (
    <nav
      className='flex relative justify-between h-16 bg-gray-1000 px-5'
      style={{ zIndex: '10000' }}
    >
      <div className='flex items-center justify-center'>
        {showMenu && !showBack ? (
          <button onClick={onMenuClick} className='p-0 font-bold w-9'>
            {icon}
          </button>
        ) : null}

        {showBack ? (
          <Button onClick={router.back}>
            <BackwardFilled />
          </Button>
        ) : null}
      </div>
      <Link href={redirectTo} passHref>
        <div style={{ padding: '15px 0' }}>
          <Image
            src='/images/quik-logo.svg'
            width={137}
            height={36}
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
    </nav>
  )
}
