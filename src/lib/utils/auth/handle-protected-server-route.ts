import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import Xata from "@/lib/xata"

export const handleProtectedServerRoute = async (
  customer_id: string,
  callback_url_signin: string = "/",
  redirect_url_unauthorized: string = "/"
) => {
  const cookieStore = cookies()
  const session_token = cookieStore.get(
    process.env.VERCEL
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token"
  )?.value

  const signIn = () => {
    redirect("/api/auth/signin" + `?callbackUrl=${callback_url_signin}`)
  }

  const redirect_unauthorized = () => {
    redirect(redirect_url_unauthorized)
  }

  if (!session_token) {
    signIn()
  } else {
    const session = await Xata.auth.db.nextauth_sessions
      .filter({ sessionToken: session_token })
      .getFirst()

    if (!session) {
      signIn()
    } else {
      const viewer_customer = await Xata.shop.db.customer
        .filter({ user: session.user?.id })
        .select(["id"])
        .getFirst()

      if (!viewer_customer) {
        signIn()
      } else {
        if (viewer_customer?.id !== customer_id) {
          redirect_unauthorized()
        }
      }
    }
  }
}
