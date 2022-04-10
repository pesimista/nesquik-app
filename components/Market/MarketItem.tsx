import Image from 'next/image'
import { defaultImage } from '../../lib/helpers'
import { Market } from '../../lib/types/markets/market.interface'

type MarketItemProps = {
  market: Market
  bgImage: string
  className?: string
  isOpen?: boolean
  bgClassName?: string
  children?: JSX.Element[] | JSX.Element
}

export default function MarketItem({
  market,
  className = '',
  isOpen = true,
  bgClassName = 'h-24',
  bgImage,
  children = [],
}: MarketItemProps) {
  return (
    <div className={`flex flex-col relative ${className}`}>
      <div className={`w-full relative`}>
        <div
          className={`bg-center bg-slate-300 bg-cover ${bgClassName} ${
            !isOpen ? 'grayscale' : ''
          }`}
          style={{
            backgroundImage: `url('${bgImage}')`,
          }}
        ></div>
      </div>

      <div className='absolute mx-3 w-24 h-24 top-8'>
        <div className='block border-4 border-solid bg-slate-300 border-white rounded-2xl shadow-md'>
          <Image
            className='rounded-xl'
            src={market.images.profile || defaultImage}
            alt={market.name}
            layout='responsive'
            width={1}
            height={1}
          />
        </div>
      </div>

      {children}
    </div>
  )
}
