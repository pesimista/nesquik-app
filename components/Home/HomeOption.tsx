import Link from 'next/link'
import Image from 'next/image'

export default function HomeOption({ title, src, alt, href }) {
  return (
    <Link href={href} passHref>
      <div>
        <Image src={src} alt={alt} width={120} height={120} />
        <p className='font-bold'>{title}</p>
      </div>
    </Link>
  )
}
