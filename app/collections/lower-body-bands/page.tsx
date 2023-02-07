import Image from "next/image"

import ProductQuickView from "@/components/ProductQuickView"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { PRODUCTS } from "@/lib/constants"

const ProductPage = () => {
  return (
    <>
      <section className="container grid items-center gap-4 pt-6 pb-8 md:py-10">
        <div className="flex justify-between sm:flex-row flex-col">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Lower Body <br className="hidden sm:inline" />
            Bands
          </h1>
          <h2 className="flex items-center sm:text-right text-left leading-tight tracking-tighter sm:text-lg md:text-xl lg:text-2xl">
            Bandas para el <br className="hidden sm:inline" />
            Tren Inferior
          </h2>
        </div>
        <div className="w-full gap-4 grid grid-cols-2 md:grid-cols-4">
          <div className="">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/assets/LowerBody-3.jpg"
                alt="Photo by Alvaro Pinot"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/assets/LowerBody-0.jpg"
                alt="Photo by Alvaro Pinot"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="col-span-2">
            <AspectRatio ratio={2 / 1}>
              <Image
                src="/assets/LowerBody-1.jpg"
                alt="Photo by Alvaro Pinot"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </section>
      <section className="container">
        <h1 className="font-bold text-3xl text-center">
          ¡Bandas de resistencia para llevar tu entrenamiento al
          <br className="hidden sm:inline" />
          <span className="underline text-4xl underline-offset-4 decoration-pink-500">
            máximo nivel!
          </span>
        </h1>
      </section>
      <section className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center gap-4 pt-6 pb-8 md:py-10">
        {PRODUCTS.map((p) => (
          <ProductQuickView {...p} key={p.id} />
        ))}
      </section>
      <section className="container pt-6 pb-8 md:py-10">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/assets/LowerBody-2.jpg"
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
