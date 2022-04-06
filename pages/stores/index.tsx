import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Input, Row } from 'antd'
import { collection, orderBy, query, where } from 'firebase/firestore'
import Head from 'next/head'
import Link from 'next/link'
import React, { FormEvent } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoryItem from '../../components/Market/CategoryItems'
import MarketItem from '../../components/Market/MarketItem'
import { firestore } from '../../lib/firebase'
import { defaultDesc, defaultImage } from '../../lib/helpers'
import { normalize } from '../../lib/helpers/string'
import { getCurrentUTC } from '../../lib/helpers/time'
import useMarkets from '../../lib/hooks/useMarkets'
import { Category } from '../../lib/types/markets/categories.type'
import { Market } from '../../lib/types/markets/market.interface'

type SearchEvent = FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>

// import market from './store.json'

function useFilteredMarkets() {
  const marketDocs = useMarkets()
  const [markets, setMarkets] = React.useState<Market[]>(null)
  const [filter, setFilter] = React.useState<string>('')
  const [category, setCategory] = React.useState<Partial<Category>>(null)

  React.useEffect(() => {
    if (!filter && !category) {
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

      if (filter && !regex.test(criteria)) {
        return false
      }

      if (category) {
        const hasCategory = item.categories.categoriesDescriptions.some(
          (cat) => cat.categoryID === category.categoryID
        )

        return hasCategory
      }

      return true
    })

    setMarkets(filtered)
  }, [category, filter, marketDocs])

  return { markets, setFilter, filter, category, setCategory }
}

export default function StoresShowcase() {
  const amount = 10

  const { markets, filter, category, setFilter, setCategory } =
    useFilteredMarkets()
  const [categories, loadingCategories] = useCollectionData(
    query(
      collection(firestore, 'categories'),
      where('parent', '==', 'R6JtZlEk1IwViiOvRbKM'),
      orderBy('order')
    )
  )

  const [length, setLength] = React.useState(amount)
  const today = React.useRef(getCurrentUTC())
  const value = React.useRef<Input>(null)

  const search = (e: SearchEvent) => {
    e.preventDefault()
    setFilter(value.current.state.value)
    setLength(amount)
    value.current.setState(value => ({ ...value, value: '' }))
  }

  const searchByCategory = (category: Category) => {
    setCategory({ categoryID: category.categoryID, name: category.name })
    setLength(amount)
  }

  const clear = () => {
    setFilter('')
    value.current.setState(value => ({ ...value, value: '' }))
    setLength(amount)
  }

  const clearCategory = () => {
    setCategory(null)
    setLength(amount)
  }

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

  const categoryItems = categories?.reduce(
    (col: JSX.Element[], item: Category) => {
      if (category?.categoryID !== item.categoryID) {
        col.push(
          <CategoryItem
            key={item.categoryID}
            onClick={() => searchByCategory(item)}
            label={item.name}
            image={item.image}
          />
        )
      }

      return col
    },
    []
  )

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
          <Row justify='center'>
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

        {!loadingCategories && (
          <div className='w-full overflow-y-scroll py-2 my-2'>
            <div className='flex'>{categoryItems}</div>
          </div>
        )}

        <div className='flex'>
          {Boolean(filter) && (
            <div
              onClick={clear}
              className='h-5 inline-block bg-purple-1100 px-3 mx-1 rounded-2xl text-white font-bold text-sm'
            >
              <span className='flex items-center'>
                "{filter}"
                <CloseOutlined className='pl-3' style={{ fontSize: '0.9rem' }} />
              </span>
            </div>
          )}

          {Boolean(category) && (
            <div
              onClick={clearCategory}
              className='h-5 inline-block bg-purple-1100 px-3 mx-1 rounded-2xl text-white font-bold text-sm'
            >
              <span className='flex items-center'>
                "{category.name}"
                <CloseOutlined className='pl-3' style={{ fontSize: '0.9rem' }} />
              </span>
            </div>
          )}
        </div>

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
