import Link from 'next/link'
import Image from 'next/image'

export default function HomeOption({ title, src, alt, href }) {
  return (
    <Link href={href} passHref>
      <div className='p-1 flex-1 basis-0 block'>
        <Image src={src} alt={alt} layout='responsive' width={1} height={1} />
        <p style={{ fontSize: '13px' }} className='font-bold text-center'>
          {title}
        </p>
      </div>
    </Link>
  )
}
