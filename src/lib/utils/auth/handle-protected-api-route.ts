import type { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

import { getFirstAndLastName } from "@/lib/utils"
import Xata from "@/lib/xata"

export const handleProtectedAPIRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let error: boolean = false

  const session = await getServerSession(req, res, authOptions)

  if (!session || !session.user) {
    error = true
    res.status(401).json({ error: "Unauthenticated" })
    return { error }
  }

  const email = session.user.email

  const user = await Xata.auth.db.nextauth_users.filter({ email }).getFirst()

  if (!user) {
    error = true
    res.status(500).json({ error: "Server Authentication Error" })
    return { error }
  }

  const [first_name, last_name] = getFirstAndLastName(user.name || "")

  const customer = await Xata.shop.db.customer
    .filter("user", user.id)
    .getFirst()

  if (!customer) {
    const created_customer = await Xata.shop.db.customer.create({
      user: user.id,
      first_name,
      last_name,
      email: user.email || "",
      image: user.image,
    })

    if (created_customer.first_name) {
      await user.update({
        name: null,
        image: null,
      })
    }

    res.status(500).json({ error: "Server Authentication Error" })
    return { customer: created_customer, error }
  }

  return { customer, error }
}
