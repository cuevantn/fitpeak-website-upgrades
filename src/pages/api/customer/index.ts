import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"

import { getFirstAndLastName } from "@/lib/utils"
import Xata from "@/lib/xata"
import { authOptions } from "../auth/[...nextauth]"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session || !session.user) {
    res.status(401).json({ error: "Unauthenticated" })
    return
  }

  const email = session.user.email

  const user = await Xata.auth.db.nextauth_users.filter({ email }).getFirst()

  if (!user) {
    res.status(500).json({ error: "Server Authentication Error" })
    return
  }

  const [first_name, last_name] = getFirstAndLastName(user.name || "")

  let customer = await Xata.shop.db.customer.filter("user", user.id).getFirst()

  if (!customer) {
    // create customer
    customer = await Xata.shop.db.customer.create({
      user: user.id,
      first_name,
      last_name,
      email: user.email || "",
      image: user.image,
    })

    if (customer.first_name) {
      // delete used info from user
      await user.update({
        name: null,
        image: null,
      })
    }
  }

  switch (req.method) {
    case "GET":
      res.status(200).json({ ok: true, customer })
      break
    case "PUT":
      const { first_name, last_name, DNI, email, phone_prefix, phone_number } =
        req.body

      if (
        !first_name ||
        !last_name ||
        !DNI ||
        !email ||
        !phone_prefix ||
        !phone_number
      ) {
        const { preferred_address } = req.body

        if (preferred_address) {
          await customer.update({
            preferred_address,
          })
          res.status(200).json({ ok: true })
          return
        }

        res.status(400).json({ error: "Missing required fields" })
        return
      }

      await customer.update({
        first_name,
        last_name,
        DNI,
        email,
        phone_prefix,
        phone_number,
      })

      res.status(200).json({ ok: true })
      break
    default:
      res.status(405).json({ error: "Method not allowed" })
      break
  }
}

export default handler
