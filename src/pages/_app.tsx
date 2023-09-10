import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Lato } from 'next/font/google'
import { AuthGuard } from '~/components/AuthGuard'
import { DefaultLayout } from '~/components/Layout/DefaultLayout'
import '~/styles/globals.css'
import '~/i18n/config'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

type Props = AppProps & { pageProps: { session: Session } }

export default function App(props: Props) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props

  const Layout = DefaultLayout

  return (
    <SessionProvider session={session}>
      <AuthGuard>
        <Layout className={lato.className}>
          <Component {...pageProps} />
        </Layout>
      </AuthGuard>
    </SessionProvider>
  )
}
