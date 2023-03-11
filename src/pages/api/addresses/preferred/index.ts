import type { NextApiRequest, NextApiResponse } from "next"

import { handleProtectedAPIRoute } from "@/lib/utils/auth/handle-protected-api-route"
import Xata from "@/lib/xata"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { customer, error } = await handleProtectedAPIRoute(req, res)
  if (error || !customer) return

  if (!customer.preferred_address?.id) {
    res.status(200).json({ ok: true, preferred_address: null })
    return
  }

  const preferred_address = await Xata.shop.db.address.read(
    customer.preferred_address.id
  )

  switch (req.method) {
    case "GET":
      res.status(200).json({ ok: true, preferred_address })
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

      const updatedAddress = await Xata.shop.db.customer.update(customer.id, {
        preferred_address: addressId,
      })

      if (!updatedAddress) {
        res.status(500).json({ error: "Server error" })
        return
      }

      res.status(200).json({ ok: true })
      break
    default:
      res.status(405).json({ error: "Method not allowed" })
      break
  }
}

export default handler
