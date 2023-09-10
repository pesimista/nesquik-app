import { ClockCircleOutlined, StarFilled } from '@ant-design/icons'
import Image from 'next/image'
import React from 'react'
import { isBetweenTimes } from '../../../lib/helpers/time'
import { Market } from '../../lib/types/markets/market.interface'
import MarketItem from './MarketItem'
import { QuikTag, Tag } from './Tags'

type MarketProfileProps = {
  market: Market
}

export default function MarketProfile({ market }: MarketProfileProps) {
  const date = React.useRef(new Date())

  const today = market.schedule[date.current.getDay()]
  const isOpen = isBetweenTimes(
    today.initialTime,
    today.finalTime,
    date.current
  )

  let statusLabel = <Tag color='bg-green-1000' label='Abierto' />

  if (!isOpen) {
    statusLabel = <Tag color='bg-red-500 ' label='Cerrado' />
  }

  return (
    <MarketItem
      market={market}
      isOpen={isOpen}
      bgImage={market.images.backgroundImage}
      bgClassName={'h-20'}
    >
      <div className='flex flex-col px-4 pb-3 pt-2'>
        <h2 className='text-xl font-bold flex items-center pl-24 pb-5'>
          {market.isPremium && (
            <Image
              src={'/images/premium.svg'}
              height={22}
              width={28}
              alt='premium'
            />
          )}
          {market.name}
        </h2>

        <p className='font-semibold mb-2 text-xs text-gray-400 flex items-center'>
          <ClockCircleOutlined className='pr-1' style={{ fontSize: '1rem' }} />
          <span className='text-green-1000'>
            Tiempo de entrega {market.estimatedTime} -{' '}
            {market.estimatedTime + 30} minutos
          </span>
        </p>
        <div className='flex'>
          {Boolean(market.isOnlyQuik) && <QuikTag />}
          {Boolean(market.hasPromo) && <Tag label='promos' className='mr-1' />}
          {statusLabel}
          <div className='grow'></div>
          <p className='font-semibold text-xs text-gray-400 flex items-center'>
            <StarFilled
              className='text-yellow-400 pr-1'
              style={{ fontSize: '1rem' }}
            />
            {market.rating}
          </p>
        </div>
      </div>
    </MarketItem>
  )
}
