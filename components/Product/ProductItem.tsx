import { Product } from '../../lib/types/products/product.interface'
import Image from 'next/image'
import { defaultImage } from '../../lib/helpers'
import { currencyFormatter } from '../../lib/helpers/pipes'
import { Tag } from '../Market/Tags'

type ProductItemProps = {
  product: Product
  className?: string
  onClick?: VoidFunction
}

export default function ProductItem({
  product,
  className = '',
  onClick = null,
}: ProductItemProps) {
  return (
    <div className={`flex ${className}`} onClick={onClick}>
      <div>
        <div className='h-36 w-36 inline-block'>
          <Image
            src={product.pictures || defaultImage}
            alt={product.name}
            layout='responsive'
            className={product.stock <= 0 ? 'grayscale' : ''}
            height={1}
            width={1}
          />
        </div>
      </div>

      <div className='p-2 flex flex-col justify-between'>
        <p className='font-bold text-sm flex items-center'>{product.name}</p>
        <p
          className='line text-gray-400 h-9 overflow-hidden overflow-ellipsis'
          style={{ lineHeight: '0.75rem', fontSize: '0.75rem' }}
        >
          {product.shortDescription}{' '}
        </p>

        <div>
          <div className='flex'>
            {product.stock <= 0 && (
              <Tag label='Agotado' color='bg-red-500' className='mr-1' />
            )}
            {Boolean(product.promo) && <Tag label='promo' className='mr-1' />}
          </div>
          <span className='text-green-1000 text-sm font-semibold'>
            {currencyFormatter.format(product.price)}
          </span>
        </div>
      </div>
    </div>
  )
}
