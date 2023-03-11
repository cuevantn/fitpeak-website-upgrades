import type { NextApiRequest, NextApiResponse } from "next"

import { handleProtectedAPIRoute } from "@/lib/utils/auth/handle-protected-api-route"
import Xata from "@/lib/xata"
import {
  BagRecord,
  CustomerRecord,
  OrderProductRecord,
  ProductRecord,
} from "@/lib/xata/codegen/shop"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { customer, error } = await handleProtectedAPIRoute(req, res)
  if (error || !customer) return

  switch (req.method) {
    case "GET":
      const orders = await Xata.shop.db.order
        .filter("customer", customer.id)
        .select([
          "products_price",
          "shipping_price",
          "discounts",
          "paid_at",
          "created_at",
        ])
        .sort("created_at", "desc")
        .getAll()

      res.status(200).json({ ok: true, orders })
      break

    case "POST":
      const bag_items = await Xata.shop.db.bag
        .filter("customer", customer.id)
        .select(["*", "product.price", "product.sale_price"])
        .getAll()

      if (!bag_items?.length) {
        res.status(400).json({ error: "No items found" })
        return
      }

      // if any of the items doesn't have a product, we can't create the order

      const has_invalid_items = bag_items.some(
        ({ product }) => !product || !product.price
      )

      if (has_invalid_items) {
        res.status(400).json({ error: "Invalid items found" })
        return
      }

      interface BagItemProduct extends BagRecord {
        product: ProductRecord
      }

      const items = bag_items as BagItemProduct[]

      const products_price = items.reduce(
        (acc, { product, quantity }) => acc + product.price * quantity,
        0
      )

      let products_sale_price: number | null = items.reduce(
        (acc, { product, quantity }) =>
          acc + (product.sale_price || 0) * quantity,
        0
      )

      if (products_sale_price === 0) {
        products_sale_price = null
      }

      const shipping_price = 15 // TODO: calculate shipping price

      const order = await Xata.shop.db.order.create({
        products_price,
        products_sale_price,
        created_at: new Date(),
        customer: customer.id,
        shipping_price,
        shipping_address: customer.preferred_address,
      })

      if (!order?.id) {
        res.status(500).json({ error: "Could not create order" })
        return
      }

      const order_items = await Promise.all(
        items.map(async ({ product, quantity }) => {
          const order_item = await Xata.shop.db.order_product.create({
            quantity,
            unit_price: product.price,
            unit_sale_price: product.sale_price,
            product: product.id,
            order: order.id,
          })
          return !!order_item.id
        })
      )

      if (!order_items.every((item) => item)) {
        // TODO: delete created order

        res.status(500).json({ error: "Could not create order items" })
        return
      }

      // delete bag items

      await Promise.all(
        items.map(async ({ id }) => {
          const deleted_item = await Xata.shop.db.bag.delete(id)
          return !!deleted_item?.id
        })
      )

      res.status(200).json({ ok: true, order_id: order.id })
      break
    default:
      res.status(405).json({ error: "Method not allowed" })
      break
  }
}

export default handler
