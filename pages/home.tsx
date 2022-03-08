import React from 'react'
import { EnvironmentFilled } from '@ant-design/icons'
import { Col, Row, Carousel } from 'antd'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import HomeOption from '../components/Home/HomeOption'
import UserCard from '../components/Home/UserCard'
import Loader from '../components/Loader'
import { useRequiredUser } from '../lib/context'
import { defaultDesc, defaultImage } from '../lib/helpers'
import { useBanners } from '../lib/hooks/useBanners'

export default function HomePage() {
  const { userDoc: user } = useRequiredUser()
  const { value: banners } = useBanners()

  if (!user) {
    return <Loader loading={true} />
  }

  return (
    <>
      <Head>
        <title>Nesquik Dashboard</title>
        <meta name='title' content='>Nesquik' />
        <meta name='description' content={defaultDesc} />

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
      <div className='main-container'>
        <UserCard userInfo={user} />
        <div className='mt-2 flex justify-center'>
          <HomeOption
            href='/home'
            title='Escanear'
            src='/images/icon-scan-to-pay.svg'
            alt='scan-to-pay'
          />
          <HomeOption
            href='/home'
            title='Transferir'
            src='/images/icon-payment.svg'
            alt='payment'
          />
          <HomeOption
            href='/home'
            title='QUIKcard'
            src='/images/icon-miquik.svg'
            alt='miquik'
          />
          <HomeOption
            href='/home'
            title='Recarga'
            src='/images/icon-recharge.svg'
            alt='recharge'
          />
          <HomeOption
            href='/home'
            title='Pedidos'
            src='/images/icon-requests.svg'
            alt='request'
          />
        </div>

        <div>
          <h5 className='font-bold' style={{ fontSize: '22px' }}>
            ¿Qué necesitas hoy?
          </h5>
          <div className='flex justify-start items-center mb-2'>
            <EnvironmentFilled className='text-green-500' />
            <span className='font-bold ml-2'>Enviar a isabella</span>
          </div>

          <Row>
            {banners.lead.map((banner, index) => {
              const col = +banner.col * 2
              const full = col === 24
              const imageSize = full ? 50 : 40
              const padding = !full && !(index % 2) ? 'pr-1' : ''

              return (
                <Col key={banner.bannerID} span={col} className={padding}>
                  <Link href={banner.url || '/home'} passHref>
                    <div
                      className='rounded-lg flex justify-start items-center p-1 h-16 mb-1'
                      style={{
                        backgroundColor: banner.backgroundColor,
                        fontSize: '13px',
                      }}
                    >
                      <div className='mr-2'>
                        <Image
                          src={banner.image}
                          alt={banner.name}
                          height={imageSize}
                          width={imageSize}
                        />
                      </div>
                      <div className='text-white'>
                        <strong>{banner.name}</strong>
                        {full && (
                          <p style={{ fontSize: '12px' }}>{banner.caption}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </Col>
              )
            })}
          </Row>
        </div>

        <Carousel autoplay dots={false} autoplaySpeed={5000} className='mt-1'>
          {banners.promo.map((banner) => {
            return (
              <div key={banner.bannerID} className='w-full relative h-24'>
                <Image
                  src={banner.image}
                  alt={banner.name}
                  layout='fill'
                  objectFit='cover'
                />
              </div>
            )
          })}
        </Carousel>

        <div>
          <h5 className='font-bold my-2' style={{ fontSize: '22px' }}>
            Tenemos todo esto para ti
          </h5>

          <Row>
            {banners.category.map((banner) => {
              return (
                <Col key={banner.bannerID} span={6}>
                  <div className='p-1 block w-full'>
                    <Image
                      className={`rounded-2xl ${
                        banner.disabled ? 'grayscale' : ''
                      }`}
                      src={banner.image}
                      alt={banner.name}
                      layout='responsive'
                      width='1'
                      height='1'
                    />
                    <p className='text-center font-bold'>{banner.caption}</p>
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
      <div className='w-full'>
        <div className='block'>
          <Image
            src='/images/home-bridge-4.svg'
            alt='bottom'
            layout='responsive'
            height={7}
            width={50}
          />
        </div>
      </div>
    </>
  )
}
