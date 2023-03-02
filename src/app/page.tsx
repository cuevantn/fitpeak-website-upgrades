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
        <div className="flex justify-between sm:flex-row flex-col">
          <Heading>Power Bands</Heading>
        </div>
        <div className="w-full gap-4 grid grid-cols-2 md:grid-cols-4">
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
      </section>
      <section className="container">
        <h3 className="font-bold text-3xl text-center">
          ¡Bandas de resistencia para llevar tu entrenamiento al{" "}
          <br className="hidden sm:inline" />
          <span className="underline text-4xl underline-offset-4 decoration-pink-500">
            máximo nivel!
          </span>
        </h3>
      </section>
      <section className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center gap-4 pt-6 pb-8 md:py-10">
        {products.map((p) => (
          <ProductQuickView stock={50} google_category={""} {...p} key={p.id} />
        ))}
      </section>
      <section className="container pt-6 pb-8 md:py-10">
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
