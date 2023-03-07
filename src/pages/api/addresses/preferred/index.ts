import type { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

import { handleProtectedAPIRoute } from "@/lib/utils/handle-protected-api-route"
import Xata from "@/lib/xata"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { customer, error } = await handleProtectedAPIRoute(req, res)
  if (error || !customer) return

  switch (req.method) {
    case "GET":
      if (customer?.preferred_address) {
        const preferred_address = await Xata.shop.db.address.read(
          customer.preferred_address
        )
        res.status(200).json({ ok: true, preferred_address })
      } else {
        res.status(200).json({ ok: true, preferred_address: null })
      }
      break
    case "PUT":
      const { addressId } = req.body

      if (!addressId) {
        res.status(400).json({ error: "Missing addressId" })
        return
      }

      const address = await Xata.shop.db.address.read(addressId)

      if (!address) {
        res.status(400).json({ error: "Invalid addressId" })
        return
      }

      await Xata.shop.db.customer.update(customer.id, {
        preferred_address: addressId,
      })

      res.status(200).json({ ok: true })
      break
    default:
      res.status(405).json({ error: "Method not allowed" })
      break
  }
}

export default handler
