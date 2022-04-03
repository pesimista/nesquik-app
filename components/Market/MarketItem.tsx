import Image from 'next/image'
import { Market } from '../../lib/types/markets/market.interface'
import { EnvironmentOutlined, StarFilled, ClockCircleOutlined } from '@ant-design/icons'
import { defaultImage } from '../../lib/helpers'
import { isBetweenTimes } from '../../lib/helpers/time'

interface MarketItemProps {
  market: Market,
  date?: Date
}

export default function MarketItem({ market, date = new Date() }: MarketItemProps) {
  const categories = market.categories.categoriesDescriptions.map(cat => cat.name).join(' · ')

  const today = market.schedule[date.getDay()]
  const closingTime = today.finalTime
  const isOpen = isBetweenTimes(today.initialTime, today.finalTime, date)

  let statusLabel = (
    <div className='absolute h-5 bg-green-1000 px-2 rounded-2xl text-white font-bold text-sm top-28 right-3'>
      Abierto
    </div>
  )

  if (!isOpen) {
    statusLabel = (
      <div className='absolute h-5 bg-red-400 px-2 rounded-2xl text-white font-bold text-sm top-28 right-3'>
        Cerrado
      </div>
    )
  }

  return (
    <div className='shadow shadow-slate-500 flex flex-col border border-solid border-slate-200 relative'>
      <div className='w-full h-24 relative'>
        {
          Boolean(market.images.showcaseBackgroundImage) &&
          <div className={`bg-center bg-cover py-12 ${!isOpen ? 'grayscale' : ''}`} style={{ backgroundImage: `url('${market.images.showcaseBackgroundImage}')` }}></div>
          // <Image src={market.images.showcaseBackgroundImage} alt={market.name} layout='fill' />
        }
      </div>

      <div className='flex pb-3 pt-9'>
        <div className='pl-3 w-36' style={{ minHeight: '56px' }}>
          <p className='font-bold text-sm flex items-center'>
            {market.isPremium && <Image src={'/images/premium.svg'} height={18} width={23} alt="premium" />}
            {market.name}
          </p>
          <p className='font-semibold text-xs text-gray-400'> {categories} </p>
          <p className='font-semibold text-xs text-gray-400'> Cierra: {closingTime} </p>
        </div>

        <div className='pr-3 flex flex-col justify-end items-end grow'>
          <p className='font-semibold text-xs text-gray-400 flex items-center'>
            <StarFilled className='text-yellow-400 pr-1' style={{ fontSize: '1rem' }} />
            {market.rating}
          </p>
          <p className='font-semibold text-xs text-gray-400 flex items-center'>
            <EnvironmentOutlined className='pr-1' style={{ fontSize: '1rem' }} />
            a 1km
          </p>
          <p className='font-semibold text-xs text-gray-400 flex items-center'>
            <ClockCircleOutlined className='pr-1' style={{ fontSize: '1rem' }} />
            <span className='text-green-1000'>
              {market.estimatedTime} a {market.estimatedTime + 30}  min de entrega
            </span>
          </p>
        </div>
      </div>

      {statusLabel}

      <div className='absolute mx-3 w-24 h-24 top-8'>
        <div className='block border-4 border-solid border-white rounded-2xl shadow-md' >
          <Image className='rounded-xl' src={market.images.profile || defaultImage} alt={market.name} layout="responsive" width={1} height={1} />
        </div>
      </div>

      <div className='absolute right-2 top-2 flex'>
        {
          Boolean(market.isOnlyQuik) &&
          <div className='h-4 mr-1 bg-gray-1000 px-2 rounded-2xl text-white font-bold text-xs flex items-center'>
            Solo en
            <span className='pl-0.5 pt-2'>
              <Image src={'/images/logo-quik.svg'} height={16} width={40} alt="quik" />
            </span>
          </div>
        }
        {
          Boolean(market.hasPromo) &&
          <span className='h-4 bg-purple-1100 px-2 rounded-2xl text-white font-bold text-xs'>
            promos
          </span>
        }
      </div>
    </div>

  )
}