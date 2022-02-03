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
  showCart = true
}) {
  const router = useRouter()
  const icon = visibility ? <CloseOutlined /> : <MenuOutlined />
  const redirectTo = showMenu ? '/home' : '/'

  return (
    <nav style={{ display: 'flex', position: 'relative', zIndex: '10000', justifyContent: 'space-between', height: '64px', backgroundColor: '#2b2b2b', padding: '0 1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {
          showMenu && !showBack ?
            <Button onClick={onMenuClick}>
              {icon}
            </Button>
            : null
        }


        {showBack ?
          <Button onClick={router.back}>
            <BackwardFilled />
          </Button>
          : null
        }
      </div>
      <Link href={redirectTo} passHref>
        <div style={{ padding: '13px 0' }} >
          <Image
            src='/images/quik-logo.svg'
            width={137}
            height={36}
            alt='quik-logo'
          />
        </div>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {
          showCart
            ? <Image src='/images/cart.svg' alt='cart' width={40} height={40} />
            : <Link href='/login' passHref><Button shape='round'>Login</Button></Link>
        }
      </div>
    </nav>
  )
}