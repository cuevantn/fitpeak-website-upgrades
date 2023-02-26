import Image from "next/image"
import { XataClient } from "@/xata"

import { Icons } from "@/components/icons"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"

const xata = new XataClient()

const getProduct = async (id: string) => {
  const product = await xata.db.product.read(id)
  return product
}

const ProductPage = async ({ params: { id } }) => {
  const product = await getProduct(id)

  if (!product) {
    return <div>Not found</div>
  }

  const { name, image, description, additional_images, price, sale_price } =
    product
  return (
    <>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex flex-col space-y-2">
          <h1 className="w-full text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
            {name}
          </h1>
          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <p className="text-2xl">S/ {sale_price}</p>
                <p className="text-red-500 text-sm line-through">S/ {price}</p>
              </div>
              <div className="flex items-center">
                <Icons.truck className="w-5 h-5" />
                <p className="ml-1">Envíamos a todo el Perú</p>
              </div>
            </div>
            <Button size="lg" className="w-full">
              Agregrar a la bolsa
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="shrink-0 w-full md:w-1/2 h-min grid grid-cols-2 grid-rows-4 gap-4">
            <div className="col-span-2 row-span-2">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={image || "/assets/UpperBody-3.jpg"}
                  alt="Photo by Alvaro Pinot"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            {additional_images?.map((image, index) => (
              <div key={index}>
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={image || "/assets/UpperBody-3.jpg"}
                    alt="Photo by Alvaro Pinot"
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
          <div className="sm:w-full md:w-1/2">
            <p className="whitespace-pre-line max-w-xl">{description}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductPage
