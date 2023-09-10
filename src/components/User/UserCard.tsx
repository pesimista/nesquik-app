import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { toDollars } from '~/lib/formatters/currency'
import { cn } from '~/lib/utils'
import { HomeOption } from './HomeOption'

type Props = {
  name?: string
  className?: string
}

export const UserCard = (props: Props) => {
  const { data } = useSession()

  const { className } = props

  const { t } = useTranslation()

  const options = [
    {
      route: '/home',
      title: 'home.pay',
      image: '/images/icon-scan-to-pay.svg',
    },
    // {
    //   route: '/home',
    //   title: 'home.transferir',
    //   image: '/images/icon-payment.svg',
    // },
    // {
    //   route: '/home',
    //   title: 'home.card',
    //   image: '/images/icon-miquik.svg',
    // },
    {
      route: '/home',
      title: 'home.refill',
      image: '/images/icon-recharge.svg',
    },
    {
      route: '/home',
      title: 'home.orders',
      image: '/images/icon-requests.svg',
    },
  ]

  return (
    <div
      className={cn(
        className,
        'design-background w-full h-40 p-3 flex gap-4 justify-between items-center'
      )}
    >
      <div className='flex flex-col bg-[#630db5] p-3 rounded-xl'>
        <span className='text-lg text-white'>
          {t('hello')}! <b>{data?.user.name}</b>
        </span>

        <span className='font-bold text-white justify-center items-center text-2xl'>
          {toDollars(0)}
        </span>
      </div>

      <div className='grow flex justify-center gap-1'>
        {options.map((item) => (
          <HomeOption
            key={item.title}
            title={t(item.title)}
            image={item.image}
            route={item.route}
          />
        ))}
      </div>
    </div>
  )
}
