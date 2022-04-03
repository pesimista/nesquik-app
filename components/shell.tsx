import { Button, Drawer } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { logout } from '../lib/auth'
import { useUser } from '../lib/context'
import Navbar from './Navbar'

const URLS = ['/', '/home', '/login']

function isHome(url): boolean {
  if (URLS.includes(url)) {
    return true
  } else {
    return false
  }
}

export default function Shell({ children }) {
  const { userDoc } = useUser()
  const router = useRouter()
  const [drawerVisibility, setVisibility] = React.useState(false)
  const [showBackButton, setIsHome] = React.useState(() =>
    isHome(router.pathname)
  )
  const toggleDrawer = () => setVisibility(!drawerVisibility)

  React.useEffect(() => {
    const handler = (url) => {
      setIsHome(isHome(url))

      setVisibility(false)
    }

    router.events.on('routeChangeStart', handler)

    return () => {
      router.events.off('routeChangeStart', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function logoff() {
    logout()
    setVisibility(false)
    router.push('/')
  }

  return (
    <React.Fragment>
      <Navbar
        visibility={drawerVisibility}
        showMenu={Boolean(userDoc)}
        onMenuClick={toggleDrawer}
        showCart={Boolean(userDoc)}
        showBack={!showBackButton}
      />
      <main className='pt-16'>
        {children}
      </main>
      <Drawer
        width={300}
        visible={drawerVisibility}
        onClose={toggleDrawer}
        placement='left'
      >
        <div style={{ paddingTop: '32px' }}>
          <Button onClick={logoff}>logout</Button>
        </div>
      </Drawer>
    </React.Fragment>
  )
}
