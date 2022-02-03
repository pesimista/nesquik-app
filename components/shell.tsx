import { Button, Drawer } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { logout } from "../lib/auth";
import { useUser } from "../lib/context";
import Navbar from "./Navbar";

const URLS = ['/', '/home', '/login']

function isHome(url, from?): boolean {
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
  const [showBackButton, setIsHome] = React.useState(() => isHome(router.pathname, 'setter'))
  const toggleDrawer = () => setVisibility(!drawerVisibility)

  React.useEffect(() => {
    router.events.on('routeChangeStart', (url) => {
      setIsHome(isHome(url, 'event'))

      if (drawerVisibility) {
        setVisibility(false)
      }
    })

    return () => {
      router.events.off('routeChangeStart', () => { })
    }
  }, [drawerVisibility, router])


  function logoff() {
    logout()
    setVisibility(false)
    router.push('/')
  }

  return <React.Fragment>
    <Navbar
      visibility={drawerVisibility}
      showMenu={Boolean(userDoc)}
      onMenuClick={toggleDrawer}
      showCart={Boolean(userDoc)}
      showBack={!showBackButton}
    />
    {children}
    <Drawer width={300} visible={drawerVisibility} onClose={toggleDrawer} placement='left'>
      <div style={{ paddingTop: '32px' }}>
        <Button onClick={logoff}>
          logout
        </Button>
      </div>
    </Drawer>
  </React.Fragment>
}