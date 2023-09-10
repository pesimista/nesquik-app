import { ReactNode } from 'react'
import Navbar from '~/components/Navbar/Navbar'
import { cn } from '~/lib/utils'
import { UserCard } from '../User/UserCard'

type Props = {
  className: string
  children: ReactNode
}

export const DefaultLayout = (props: Props) => {
  const { children, className } = props

  return (
    <main className={cn(className, 'flex flex-col h-full')}>
      <Navbar />
      <UserCard className={'mt-16'} />
      <div className='grow p-4 bg-gray-50 '>{children}</div>
    </main>
  )
}
