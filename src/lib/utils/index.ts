import { clsx, type ClassValue } from 'clsx'
import { Session } from 'next-auth'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function logout(session: Session | null) {
  if (!session) {
    return
  }

  const url = new URL(`${process.env.NEXT_PUBLIC_AUTH0_BASE_URL}/oidc/logout`)
  url.searchParams.append('id_token_hint', session.idToken)
  url.searchParams.append(
    'post_logout_redirect_uri',
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/logout`
  )

  window.location.assign(url.toString())
}

export const normalize = (value: string, textOnly = true): string => {
  const normal = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  if (textOnly) {
    return normal.replace(/[^\w\s]/gi, '')
  }

  return normal
}

export * from './time'
