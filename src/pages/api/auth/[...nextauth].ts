import { XataAdapter } from "@next-auth/xata-adapter"
import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

import Xata from "@/lib/xata"

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  adapter: XataAdapter(Xata.auth),
}

export default NextAuth(authOptions)
