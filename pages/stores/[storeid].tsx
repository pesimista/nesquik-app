import { GetStaticPaths, GetStaticProps } from 'next'
import { firestore } from '../../lib/firebase'
import { Market } from '../../lib/types/markets/market.interface'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Carousel, Col, Divider, Input, Row } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import BannerItem from '../../components/Home/BannerItem'
import Loader from '../../components/Loader'
import CategoryItem from '../../components/Market/CategoryItems'
import MarketProfile from '../../components/Market/MarketProfile'
import { Tag } from '../../components/Market/Tags'
import ProductItem from '../../components/Product/ProductItem'
import { defaultDesc, defaultImage } from '../../lib/helpers'
import useMarketCategories, {
  useFilterByCategory,
  useSingleMarket,
} from '../../lib/hooks/useMarkets'
import { useMarketProducts } from '../../lib/hooks/useProduct'
import { MarketCategory } from '../../lib/types/markets/categories.type'
import { Product } from '../../lib/types/products/product.interface'

type SearchEvent = FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>

function useSegregateProducts(storeid) {
  const productsDocs = useMarketProducts(storeid as string)
  const [products, setProducts] = React.useState<Product[]>([])
  const { collection, category, filter, setCategory, setFilter } =
    useFilterByCategory<Product>(productsDocs, 'marketCategories')

  React.useEffect(() => {
    const copy = [...collection]
    copy.sort((a, b) => {
      const bValue = b.marketCategories.categoriesDescriptions[0].categoryID
      const aValue = a.marketCategories.categoriesDescriptions[0].categoryID
      return bValue.localeCompare(aValue)
    })

    const list = copy.reduce((col, item, index) => {
      const i = index - 1
      if (
        i < 0 ||
        copy[i].marketCategories.categoriesDescriptions[0].categoryID !==
          item.marketCategories.categoriesDescriptions[0].categoryID
      ) {
        col.push({
          productID: item.marketCategories.ids[0],
          marketCategories: item.marketCategories,
          mainMarket: 'category',
        } as Partial<Product>)
      }

      col.push(item)

      return col
    }, [] as Partial<Product>[])

    setProducts(list as Product[])
  }, [collection])

  return {
    products,
    category,
    filter,
    setCategory,
    setFilter,
  }
}

function CategoryTitle({
  categories,
}: {
  categories: Product['marketCategories']
}) {
  return (
    <div>
      <h2 className='text-xl mb-4 font-bold'>
        {categories.categoriesDescriptions[0].name}
      </h2>
    </div>
  )
}

export default function StoreDetails(props) {
  const router = useRouter()
  const { storeid } = router.query
  const market = useSingleMarket(storeid, props.item)
  const categories = useMarketCategories(storeid as string)

  const { products, category, filter, setCategory, setFilter } =
    useSegregateProducts(storeid)

  const amount = 10
  const [length, setLength] = React.useState(amount)
  const value = React.useRef<Input>(null)

  if (!market) {
    return <Loader loading={true} />
  }

  const image = market.images.profile || defaultImage
  const title = `Nesquik - ${market.name} `
  const description = market.address
    ? `Pide en ${market.name} por QUIK, desde ${market.address} hasta donde tu quieras! `
    : ''
  const descContent = `${description}${defaultDesc}`

  const search = (e: SearchEvent) => {
    e.preventDefault()
    setFilter(value.current.state.value)
    setLength(amount)
    value.current.setState((value) => ({ ...value, value: '' }))
  }

  const clearCategory = () => {
    setCategory(null)
    setLength(amount)
  }

  const searchByCategory = (category: MarketCategory) => {
    setCategory({ categoryID: category.categoryID, name: category.name })
    setLength(amount)
  }

  const clear = () => {
    setFilter('')
    value.current.setState((value) => ({ ...value, value: '' }))
    setLength(amount)
  }

  const banners = market.marketing?.reduce((col, banner, index) => {
    // if (banner.isHidden) {
    //   return col
    // }

    col.push(
      <BannerItem
        key={index}
        className='h-28'
        image={banner.image}
        alt={`${market.name}-promo-${index}`}
      />
    )

    return col
  }, [])

  const productItems = products.slice(0, length).map((item) => {
    if (item.mainMarket === 'category') {
      return (
        <CategoryTitle
          key={item.productID}
          categories={item.marketCategories}
        />
      )
    }

    return (
      <div className='mb-4' key={item.productID}>
        <Link
          href={{
            pathname: router.pathname,
            query: { ...router.query, productID: item.productID },
          }}
          prefetch={false}
          shallow
        >
          <a className='text-black hover:text-black'>
            <ProductItem
              className='shadow shadow-slate-500 border border-solid h-36'
              product={item}
            />
          </a>
        </Link>
      </div>
    )
  })

  const categoryItems = categories.map((item) => (
    <CategoryItem
      onClick={() => searchByCategory(item)}
      image={item.image}
      label={item.name}
      key={item.categoryID}
    />
  ))

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='title' content={title} />
        <meta name='description' content={descContent} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://quikpago.com/' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={descContent} />
        <meta property='og:image' content={image} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://quikpago.com/' />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={descContent} />
        <meta property='twitter:image' content={image} />
      </Head>
      <div>
        <MarketProfile market={market} />

        <div className='px-4 pt-2'>
          {Boolean(banners) && (
            <Carousel
              autoplay
              dots={false}
              autoplaySpeed={5000}
              className='mb-2'
            >
              {banners}
            </Carousel>
          )}

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

          {Boolean(categoryItems?.length) && (
            <div className='w-full overflow-y-scroll py-2 mt-2'>
              <div className='flex'>{categoryItems}</div>
            </div>
          )}

          <div className='flex my-2'>
            {Boolean(filter) && (
              <Tag onClick={clear} height='h-5' className='mx-1'>
                <span className='flex items-center h-full text-sm'>
                  "{filter}"
                  <CloseOutlined
                    className='pl-3'
                    style={{ fontSize: '0.9rem' }}
                  />
                </span>
              </Tag>
            )}

            {Boolean(category) && (
              <Tag onClick={clearCategory} height='h-5' className='mx-1'>
                <span className='flex items-center h-full text-sm'>
                  "{category.name}"
                  <CloseOutlined
                    className='pl-3'
                    style={{ fontSize: '0.9rem' }}
                  />
                </span>
              </Tag>
            )}
          </div>

          <InfiniteScroll
            dataLength={length}
            next={() => setLength(length + amount)}
            hasMore={products.length > length}
            loader={<h4>Loading...</h4>}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget='scrollableDiv'
          >
            {productItems}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await firestore.collection('markets').orderBy('name').get()
  const paths = snapshot.docs.map((doc) => {
    const data = doc.data() as Market
    return {
      params: { storeid: data.marketID },
    }
  })

  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const marketId = params.storeid as string
  const doc = await firestore.collection('markets').doc(marketId).get()
  const market = doc.data() as Market

  delete market.geolocation

  return { props: { market } }
}
