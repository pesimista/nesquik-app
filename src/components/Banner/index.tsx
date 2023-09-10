import Image from 'next/image'
import { cn } from '~/lib/utils'

type BannetItemProps = {
  key: string | number
  className: string
  image: string
  alt: string
}

export default function BannerItem({
  key,
  className,
  image,
  alt,
}: BannetItemProps) {
  return (
    <div key={key} className={cn(className, `w-full relative`)}>
      <Image
        className='rounded-lg'
        src={image}
        alt={alt}
        layout='fill'
        objectFit='cover'
      />
    </div>
  )
}
