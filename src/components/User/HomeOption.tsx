import { Url } from 'next/dist/shared/lib/router/router'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  image: string
  route: Url
}

export const HomeOption = ({ title, image, route }: Props) => {
  return (
    <Link href={route} passHref>
      <div className='block w-14'>
        <Image
          src={image}
          alt={title}
          layout='responsive'
          width={1}
          height={1}
        />
        <p className='font-bold text-center text-xs'>{title}</p>
      </div>
    </Link>
  )
}
