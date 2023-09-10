import NextAuth, { AuthOptions } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER_BASE_URL as string,
      profile: (profile, tokens) => ({
        id: profile.sub,
        idToken: tokens.id_token,
        ...profile,
      }),
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.idToken = user.idToken
      }

      return token
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub
        session.idToken = token.idToken
      }

      return session
    },
  },
}

export default NextAuth(authOptions)
