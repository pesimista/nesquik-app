import { ReactNode } from 'react'

type Props = { children: ReactNode }

export function AuthGuard(props: Props) {
  const { children } = props

  return <>{children}</>
}
