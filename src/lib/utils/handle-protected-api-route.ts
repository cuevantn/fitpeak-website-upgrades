import type { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

import Xata from "@/lib/xata"
import { CustomerRecord } from "@/lib/xata/codegen/shop"

export const handleProtectedAPIRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let error: boolean = false
  let customer: CustomerRecord | null = null

  const session = await getServerSession(req, res, authOptions)

  if (!session || !session.user) {
    error = true
    res.status(401).json({ error: "Unauthenticated" })
    return { customer, error }
  }

  const email = session.user.email

  const user = await Xata.auth.db.nextauth_users.filter({ email }).getFirst()

  if (!user) {
    error = true
    res.status(500).json({ error: "Server Authentication Error" })
    return { customer, error }
  }

  customer = (await Xata.shop.db.customer
    .filter("user", user.id)
    .getFirst()) as CustomerRecord

  if (!customer) {
    res.status(500).json({ error: "Server Authentication Error" })
    return { customer, error }
  }

  return { customer, error }
}
