import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"

import Xata from "@/lib/xata"
import { authOptions } from "../../auth/[...nextauth]"

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

  const customer = await Xata.shop.db.customer
    .filter("user", user.id)
    .getFirst()

  if (!customer) {
    res.status(500).json({ error: "Server Authentication Error" })
    return
  }

  const { addressId } = req.query

  if (!addressId || typeof addressId !== "string") {
    res.status(400).json({ error: "Missing address id" })
    return
  }

  const address = await Xata.shop.db.address.read(addressId)

  if (!address) {
    res.status(404).json({ error: "Address not found" })
    return
  }

  if (address.customer?.id !== customer.id) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  switch (req.method) {
    case "GET": {
      res.status(200).json({ success: true, address })
      break
    }

    case "PUT": {
      const { departamento, provincia, distrito, direccion, referencias } =
        req.body

      await address.update({
        departamento,
        provincia,
        distrito,
        direccion,
        referencias,
      })

      res.status(200).json({ success: true })
      break
    }

    case "DELETE": {
      await address.delete()

      res.status(200).json({ success: true })
      break
    }

    default: {
      res.status(405).json({ error: "Method not allowed" })
      break
    }
  }
}

export default handler
