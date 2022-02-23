import { EnvironmentFilled } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Head from "next/head";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Loader from "../components/Loader";
import { HomeBanner } from "../interfaces/banners/banner.interface";
import { useRequiredUser } from "../lib/context";
import { firestore } from "../lib/firebase";
import { defaultDesc, defaultImage } from "../lib/helpers";
import styles from "../styles/home.module.scss";

export async function getStaticProps() {

  console.log('being called')

  return {
    props: { some: 'data' }
  }
}

const bannersInitialValue = (): { [key: string]: HomeBanner[] } => ({
  lead: [],
  others: []
})

function useBanners() {
  const [banners, setBanners] = React.useState(bannersInitialValue)

  React.useEffect(() => {
    let unsubscribe
    unsubscribe = firestore.collection('banners').onSnapshot(item => {
      const options = bannersInitialValue()
      for (let i = 0; i < item.docs.length; i++) {
        const data = item.docs[i].data() as HomeBanner;

        if (data.type === 'lead') {
          options.lead.push(data)
          continue
        }

        options.others.push(data)
      }
      options.lead.sort((a, b) => b.priority - a.priority);

      setBanners(options)
    })
    return unsubscribe
  }, [])


  return banners
}

export default function HomePage(props) {
  const { userDoc: user } = useRequiredUser()
  const banners = useBanners()

  if (!user) {
    return <Loader loading={true} />
  }

  return (
    <>
    <Head>
      <title>Nesquik Dashboard</title>
      <meta name='title' content='>Nesquik' />
        <meta
          name='description'
          content={defaultDesc}
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://quikpago.com/' />
        <meta property='og:title' content='>Nesquik' />
        <meta property='og:description' content={defaultDesc} />
        <meta property='og:image' content={defaultImage} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://quikpago.com/' />
        <meta property='twitter:title' content='>Nesquik' />
        <meta property='twitter:description' content={defaultDesc} />
        <meta property='twitter:image' content={defaultImage} />
    </Head>
      <div className="main-container">
        <UserCard userInfo={user} />
        <div className={styles.options}>
          <Link href='/home' passHref>
            <div>
              <Image src="/images/icon-scan-to-pay.svg" alt="scan-to-pay" width={120} height={120} />
              <p className="font-bold">Escanear</p>
            </div>
          </Link>
          <Link href='/home' passHref>
            <div>
              <Image src="/images/icon-payment.svg" alt="payment" width={120} height={120} />
              <p className="font-bold">Transferir</p>
            </div>
          </Link>
          <Link href='/home' passHref>
            <div>
              <Image src="/images/icon-miquik.svg" alt="miquik" width={120} height={120} objectFit='none' />
              <p className="font-bold">QUIKcard</p>
            </div>
          </Link>
          <Link href='/home' passHref>
            <div>
              <Image src="/images/icon-recharge.svg" alt="recharge" width={120} height={120} />
              <p className="font-bold">Recarga</p>
            </div>
          </Link>
          <Link href='/home' passHref>
            <div>
              <Image src="/images/icon-requests.svg" alt="request" width={120} height={120} />
              <p className="font-bold">Pedidos</p>
            </div>
          </Link>
        </div>

        <div className={styles['banners-block']}>
          <h5>¿Qué necesitas hoy?</h5>
          <div className="flex justify-start items-center mb-2">
            <EnvironmentFilled className="text-green-500" />
            <span className="font-bold ml-2">
              Enviar a isabella
            </span>
          </div>
          <Row>
            {
              banners.lead.map((banner, index) => {
                const col = +banner.col * 2
                const full = col === 24
                const imageSize = full ? 50 : 40
                const padding = !full && !(index % 2) ? 'pr-1' : ''

                return (
                  <Col
                    key={banner.bannerID}
                    span={col}
                    className={padding}
                  >
                    <Link href={banner.url || '/home'} passHref>
                      <div className={styles.banner} style={{ backgroundColor: banner.backgroundColor }}>
                        <div className="mr-2">
                          <Image src={banner.image} alt={banner.name} height={imageSize} width={imageSize} />
                        </div>
                        <div className="text-white">
                          <strong>{banner.name}</strong>
                          {full && <p>{banner.caption}</p>}
                        </div>
                      </div>
                    </Link>
                  </Col>)
              })
            }
          </Row>
        </div>

        <Link href='/stores' passHref>
          <Button> Go to stores</Button>
        </Link>
      </div >
    </>
  )
}

function UserCard({ userInfo }) {

  return (
    <div className={styles.card}>
      <div className={styles.picture}>
        <Image width={58} height={58} src='/images/user-balance-no-profile.svg' alt='quik-logo' />
      </div>
      <div>
        <span className={styles.name} >
          Hola! {userInfo.name}
        </span>
      </div>
      <div className={styles.points}>
        $ 0.00
      </div>
    </div >
  )
}