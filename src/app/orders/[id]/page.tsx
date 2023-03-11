import { Suspense } from "react"

import { handleProtectedServerRoute } from "@/lib/utils/auth/handle-protected-server-route"
import Xata from "@/lib/xata"

const getOrder = async (id: string) => {
  const order = await Xata.shop.db.order.read(id)
  return order
}

const getProducts = async (order_id: string) => {
  const products = await Xata.shop.db.order_product
    .filter({ order: order_id })
    .select([
      "product.id",
      "product.image",
      "product.name",
      "unit_price",
      "unit_sale_price",
      "quantity",
    ])
    .getAll()
  return products
}

const OrderPage = async ({ params }) => {
  const order = await getOrder(params.id)
  if (!order?.customer?.id) {
    return <div>Not found</div>
  }

  await handleProtectedServerRoute(
    order.customer.id,
    `/orders/${params.id}`,
    "/orders"
  )

  const products = await getProducts(params.id)

  return (
    <>
      <h1>Order #{order.id}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {products.map(({ product, unit_price, unit_sale_price, quantity }) => (
          <div key={product?.id}>
            <h2>{product?.name}</h2>
          </div>
        ))}
      </Suspense>
    </>
  )
}

export default OrderPage
