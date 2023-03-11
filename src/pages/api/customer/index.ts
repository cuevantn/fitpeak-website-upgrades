import type { NextApiRequest, NextApiResponse } from "next"

import { handleProtectedAPIRoute } from "@/lib/utils/auth/handle-protected-api-route"
import { CustomerRecord } from "@/lib/xata/codegen/shop"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { customer, error } = await handleProtectedAPIRoute(req, res)
  if (error || !customer) return

  switch (req.method) {
    case "GET":
      res.status(200).json({ ok: true, customer })
      break

    case "PUT":
      const { first_name, last_name, DNI, email, phone_prefix, phone_number } =
        req.body as CustomerRecord

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

      const updated_customer = await customer.update({
        first_name: "Anthony",
        last_name,
        DNI,
        email,
        phone_prefix,
        phone_number,
      })

      if (!updated_customer) {
        res.status(500).json({ error: "Error updating customer" })
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
