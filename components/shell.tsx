import { Button, Drawer, Modal } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { logout } from '../lib/auth'
import { useUser } from '../lib/context'
import Navbar from './Navbar'
import ProductDialog from './Product/ProductDialog'

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
  const [showBack, setShowBack] = React.useState(() => isHome(router.pathname))

  const productID = router.query.productID as string

  const toggleDrawer = () => setVisibility(!drawerVisibility)

  const cleanProduct = () => {
    const query = { ...router.query }
    delete query.productID
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      null,
      { scroll: false }
    )
  }

  const logoff = () => {
    logout()
    setVisibility(false)
    router.push('/')
  }

  React.useEffect(() => {
    const handler = (url) => {
      setShowBack(isHome(url))

      setVisibility(false)
    }

    router.events.on('routeChangeStart', handler)

    return () => {
      router.events.off('routeChangeStart', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <Navbar
        visibility={drawerVisibility}
        showMenu={Boolean(userDoc)}
        onMenuClick={toggleDrawer}
        showCart={Boolean(userDoc)}
        showBack={!showBack}
      />
      <main className='pt-16'>{children}</main>
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
      <Modal
        visible={Boolean(productID)}
        className='cart'
        footer={null}
        bodyStyle={{ padding: '0px' }}
        closable={false}
        destroyOnClose={true}
      >
        <ProductDialog productID={productID} close={cleanProduct} />
      </Modal>
    </React.Fragment>
  )
}
