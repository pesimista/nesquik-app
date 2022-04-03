import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Input, Row } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import React, { FormEvent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import MarketItem from '../../components/Market/MarketItem'
import { firestore } from '../../lib/firebase'
import { defaultDesc, defaultImage } from '../../lib/helpers'
import { normalize } from '../../lib/helpers/string'
import { getCurrentUTC } from '../../lib/helpers/time'
import { Market } from '../../lib/types/markets/market.interface'

type SearchEvent = FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>

// import market from './store.json'

function useMarkets() {
  const [marketDocs, setMarketDocs] = React.useState<Market[]>(null)
  const [markets, setMarkets] = React.useState<Market[]>(null)
  const [filter, setFilter] = React.useState<string>('')

  React.useEffect(() => {
    const ref = firestore.collection('markets').orderBy('name')
    const unsubscribe = ref.onSnapshot((snapshot) => {
      const docs = snapshot.docs

      const formatedMarktes: Market[] = []
      for (const doc of docs) {
        const market = doc.data() as Market
        if (market.isHidden) continue
        formatedMarktes.push(market)
      }
      formatedMarktes.sort((a, b) => b.ranking - a.ranking)
      formatedMarktes[0].schedule[0].finalTime = '2:00 PM'
      setMarketDocs(formatedMarktes)
    })

    return unsubscribe
  }, [])

  React.useEffect(() => {
    if (!filter) {
      setMarkets(marketDocs)
      return
    }

    const normalizedFilter = normalize(filter)

    const regex = new RegExp(`(${normalizedFilter})`, 'ig')

    const filtered = marketDocs.filter((item) => {
      const categories = item.categories.categoriesDescriptions
        .map((cat) => cat.name)
        .join(' ')

      const criteria = normalize(item.name + ' ' + categories)

      return regex.test(criteria)
    })

    setMarkets(filtered)
  }, [filter, marketDocs])

  return { markets, setFilter, filter }
}

export default function StoresShowcase() {
  const amount = 10

  const { markets, setFilter, filter } = useMarkets()
  const [length, setLength] = React.useState(amount)
  const today = React.useRef(getCurrentUTC())
  const value = React.useRef<Input>(null)

  const marketItems = markets?.slice(0, length).map((item) => {
    return (
      <div className='py-2' key={item.marketID}>
        <Link href={`/stores/${item.marketID}`} passHref>
          <a className='text-black hover:text-black'>
            <MarketItem market={item} date={today.current} />
          </a>
        </Link>
      </div>
    )
  })

  const search = (e: SearchEvent) => {
    e.preventDefault()
    setFilter(value.current.state.value)
    setLength(amount)
  }

  const clear = () => {
    setFilter('')
    setLength(amount)
  }

  return (
    <>
      <Head>
        <title>Nesquik - Stores</title>
        <meta name='title' content='>Nesquik - Stores' />
        <meta name='description' content={defaultDesc} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://quikpago.com/' />
        <meta property='og:title' content='>Nesquik - Stores' />
        <meta property='og:description' content={defaultDesc} />
        <meta property='og:image' content={defaultImage} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://quikpago.com/' />
        <meta property='twitter:title' content='>Nesquik - Stores' />
        <meta property='twitter:description' content={defaultDesc} />
        <meta property='twitter:image' content={defaultImage} />
      </Head>

      <div className='p-4'>
        <form onSubmit={search}>
          <Row justify='center' className='pb-2'>
            <Col span={18}>
              <Input type='text' ref={value} allowClear />
            </Col>
            <Col span={6}>
              <Button className='w-full' onClick={search}>
                Search
              </Button>
            </Col>
          </Row>
        </form>

        {Boolean(filter) && (
          <div
            onClick={clear}
            className='h-5 inline-block bg-purple-1100 px-3 rounded-2xl text-white font-bold text-sm'
          >
            <span className='flex items-center'>
              "{filter}"
              <CloseOutlined className='pl-3' style={{ fontSize: '0.9rem' }} />
            </span>
          </div>
        )}

        {Boolean(markets) && (
          <InfiniteScroll
            dataLength={length}
            next={() => setLength(length + amount)}
            hasMore={markets.length > length}
            loader={<h4>Loading...</h4>}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget='scrollableDiv'
          >
            {marketItems}
          </InfiniteScroll>
        )}
      </div>
    </>
  )
}
