import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"

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

  const client = await Xata.shop.db.client.filter("user", user.id).getFirst()

  if (!client) {
    res.status(500).json({ error: "Server Authentication Error" })
    return
  }

  switch (req.method) {
    case "POST": {
      // Add a unit to the bag
      const { productId } = req.body

      const product = await Xata.shop.db.product.read(productId)

      if (!product) {
        res.status(404).json({ error: "Product not found" })
        return
      }

      const bagItem = await Xata.shop.db.bag
        .filter("client", client.id)
        .filter("product", product.id)
        .getFirst()

      if (bagItem) {
        await bagItem.update({
          quantity: bagItem.quantity + 1,
        })
      } else {
        await Xata.shop.db.bag.create({
          client: client.id,
          product: product.id,
          added_at: new Date(),
        })
      }

      res.status(200).json({ success: true })
      break
    }

    case "GET": {
      // Get the bag

      const bagItems = await Xata.shop.db.bag
        .filter("client", client.id)
        .select([
          "quantity",
          "added_at",
          "product.image",
          "product.name",
          "product.price",
          "product.sale_price",
        ])
        .getAll()

      res.status(200).json({ success: true, items: bagItems })
      break
    }

    case "PUT": {
      // Update the quantity of an item in the bag
      const { productId, quantity } = req.body

      const product = await Xata.shop.db.product.read(productId)

      if (!product) {
        res.status(404).json({ error: "Product not found" })
        return
      }

      const bagItem = await Xata.shop.db.bag
        .filter("client", client.id)
        .filter("product", product.id)
        .getFirst()

      if (bagItem) {
        await bagItem.update({
          quantity,
        })
        res.status(200).json({ success: true })
        return
      }

      res.status(404).json({ error: "Bag item not found" })
      break
    }
    case "DELETE": {
      // Remove an item from the bag
      const { productId } = req.body

      const product = await Xata.shop.db.product.read(productId)

      if (!product) {
        res.status(404).json({ error: "Product not found" })
        return
      }

      const bagItem = await Xata.shop.db.bag
        .filter("client", client.id)
        .filter("product", product.id)
        .getFirst()

      if (bagItem) {
        await bagItem.delete()
      }

      res.status(200).json({ success: true })
      break
    }
    default:
      res.status(200).json({ name: "John Doe" })
      break
  }
}
export default handler
