import Image from "next/image"
import Link from "next/link"
import { Heading } from "@/ui/typography"

import Xata from "@/lib/xata"

const getOrderProducts = async (orderId: string) => {
  const orderProducts = await Xata.shop.db.order_product
    .filter({ "order.id": orderId })
    .select(["product.id", "product.image", "product.name"])
    .getMany()

  return orderProducts.map((order_product) => order_product.product)
}

const getRelativeTime = (date: Date) => {
  const time = date.getTime()
  const now = new Date().getTime()
  const diff = now - time
  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) return `hace ${years} años`
  if (months > 0) return `hace ${months} meses`
  if (days > 0) return `hace ${days} días`
  if (hours > 0) return `hace ${hours} horas`
  if (minutes > 0) return `hace ${minutes} minutos`
  return "Hace instantes"
}

const getOrderStatus = ({
  created_at,
  paid_at,
  shipped_at,
  received_at,
}: {
  created_at: Date
  paid_at?: Date | null
  shipped_at?: Date | null
  received_at?: Date | null
}) => {
  if (received_at) return `Recibido ${getRelativeTime(received_at)}`
  if (shipped_at) return `Enviado ${getRelativeTime(shipped_at)}`
  if (paid_at) return `Pagado ${getRelativeTime(paid_at)}`
  return `Creado ${getRelativeTime(created_at)}`
}

const getOrders = async () => {
  const orders = await Xata.shop.db.order.getAll()
  const ordersWithProducts = await Promise.all(
    orders.map(async (order) => {
      const products = await getOrderProducts(order.id)
      const status = getOrderStatus(order)
      return { ...order, products, status }
    })
  )

  return ordersWithProducts
}

const OrdersPage = async () => {
  const orders = await getOrders()
  return (
    <div className="container">
      <Heading>Orders</Heading>
      {orders.map((order) => (
        <div key={order.id}>
          <p className="">{order.status}</p>

          <div className="flex">
          <div className="flex flex-wrap">
            {order.products.map(
              (product) =>
                product?.image && (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt="Picture of the product"
                      width={48}
                      height={48}
                      className="mr-2 mb-2 rounded-md"
                    />
                  </Link>
                )
            )}
          </div>
          <ul className="list-disc list-inside">
            {order.products.map(
              (product) => product && <li key={product.id}>{product.name}</li>
            )}
          </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrdersPage
