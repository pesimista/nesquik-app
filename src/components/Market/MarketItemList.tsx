import Image from 'next/image'
import { isBetweenTimes } from '~/lib/utils/time'
import MarketItem from './MarketItem'
import { QuikTag, Tag } from './Tags'

// import {
//   ClockCircleOutlined,
//   EnvironmentOutlined,
//   StarFilled,
// } from '@ant-design/icons'
// import { Market } from '../../lib/types/markets/market.interface'

type MarketItemListProps = {
  market: Record<string, any>
  date: Date
}

export default function MarketItemList({
  market,
  date = new Date(),
}: MarketItemListProps) {
  const today = market.schedule[date.getDay()]
  const closingTime = today.finalTime
  const isOpen = isBetweenTimes(today.initialTime, today.finalTime, date)

  let statusLabel = (
    <Tag
      className='absolute text-sm top-28 right-3'
      height='h-5'
      color='bg-green-1000'
      label='Abierto'
    />
  )

  if (!isOpen) {
    statusLabel = (
      <Tag
        className='absolute text-sm top-28 right-3'
        height='h-5'
        color='bg-red-500'
        label='Cerrado'
      />
    )
  }

  const categories = market.categories.categoriesDescriptions
    .map((cat: any) => cat.name)
    .join(' · ')

  return (
    <MarketItem
      className='shadow shadow-slate-500 border border-solid'
      market={market}
      isOpen={isOpen}
      bgImage={market.images.showcaseBackgroundImage}
    >
      <div className='flex pb-3 pt-9'>
        <div className='pl-3 w-36' style={{ minHeight: '56px' }}>
          <p className='font-bold text-sm flex items-center'>
            {market.isPremium && (
              <Image
                src={'/images/premium.svg'}
                height={18}
                width={23}
                alt='premium'
              />
            )}
            {market.name}
          </p>
          <p className='font-semibold text-xs text-gray-400'> {categories} </p>
          <p className='font-semibold text-xs text-gray-400'>
            Cierra {closingTime}
          </p>
        </div>

        <div className='pr-3 flex flex-col justify-end items-end grow'>
          <p className='font-semibold text-xs text-gray-400 flex items-center'>
            {/* <StarFilled
              className='text-yellow-400 pr-1'
              style={{ fontSize: '1rem' }}
            /> */}
            {market.rating}
          </p>
          <p className='font-semibold text-xs text-gray-400 flex items-center'>
            {/* <EnvironmentOutlined
              className='pr-1'
              style={{ fontSize: '1rem' }}
            /> */}
            a 1km
          </p>
          <p className='font-semibold text-xs text-gray-400 flex items-center'>
            {/* <ClockCircleOutlined
              className='pr-1'
              style={{ fontSize: '1rem' }}
            /> */}
            <span className='text-green-1000'>
              {market.estimatedTime} a {market.estimatedTime + 30} min de
              entrega
            </span>
          </p>
        </div>
      </div>

      {statusLabel}

      <div className='flex absolute right-2 top-2'>
        {Boolean(market.isOnlyQuik) && <QuikTag />}
        {Boolean(market.hasPromo) && <Tag label='promos' />}
      </div>
    </MarketItem>
  )
}
