import NextAuth, { DefaultUser, DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: { idToken: string; id?: string } & DefaultSession['user']
    idToken: string
  }

  interface User {
    idToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken: string
  }
}
