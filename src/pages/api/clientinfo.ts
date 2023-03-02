import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"

import { getFirstAndLastName } from "@/lib/utils"
import Xata from "@/lib/xata"
import { authOptions } from "./auth/[...nextauth]"

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

  let client = await Xata.shop.db.client.filter("user", user.id).getFirst()

  if (!client) {
    // create client
    client = await Xata.shop.db.client.create({
      user: user.id,
      first_name,
      last_name,
      email: user.email || "",
      image: user.image,
    })

    if (client.first_name) {
      // delete used info from user
      await user.update({
        name: null,
        image: null,
      })
    }
  }

  switch (req.method) {
    case "GET":
      res.status(200).json({ ok: true, client })
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
        res.status(400).json({ error: "Missing required fields" })
        return
      }

      await client.update({
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
