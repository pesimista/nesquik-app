import Image from 'next/image'

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
    <div key={key} cn={`w-full relative ${className}`}>
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
