import 'antd/dist/antd.css'
import Shell from '../components/shell'
import { UserProvider } from '../components/UserProvider'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Shell>
        <Component {...pageProps} />
      </Shell>
    </UserProvider>
  )
}

export default App
