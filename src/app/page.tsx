import Image from "next/image"
import { AspectRatio } from "@/ui/aspect-ratio"
import { Heading } from "@/ui/typography"

import Xata from "@/lib/xata"
import ProductQuickView from "@/components/ProductQuickView"

const getProducts = async () => {
  const products = await Xata.shop.db.product
    .select(["id", "image", "name", "price", "sale_price"])
    .getAll()
  return products
}

const ProductPage = async () => {
  const products = await getProducts()
  return (
    <>
      <section className="container grid items-center gap-4">
        <div className="flex flex-col justify-between sm:flex-row">
          <Heading>Power Bands</Heading>
        </div>
      </section>
      <section className="container">
        <h3 className="text-center text-3xl font-bold">
          ¡Bandas de resistencia para llevar tu entrenamiento al{" "}
          <br className="hidden sm:inline" />
          <span className="text-4xl underline decoration-pink-500 underline-offset-4">
            máximo nivel!
          </span>
        </h3>
      </section>
      <section className="container grid grid-cols-2 items-center gap-4 pt-6 pb-8 sm:grid-cols-3 md:grid-cols-4 md:py-10">
        {products.map((p) => (
          <ProductQuickView stock={50} google_category={""} {...p} key={p.id} />
        ))}
      </section>

      <section className="container md:py-10">
        <div className="mb-4 grid w-full grid-cols-2 gap-4 md:grid-cols-4">
          <div className="">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/assets/UpperBody-3.jpg"
                alt="Photo by Alvaro Pinot"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/assets/UpperBody-0.jpg"
                alt="Photo by Alvaro Pinot"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="col-span-2">
            <AspectRatio ratio={2 / 1}>
              <Image
                src="/assets/UpperBody-1.jpg"
                alt="Photo by Alvaro Pinot"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/assets/UpperBody-2.jpg"
            alt="Photo by Alvaro Pinot"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </section>
    </>
  )
}

export default ProductPage
