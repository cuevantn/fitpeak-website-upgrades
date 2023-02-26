import Image from "next/image"
import { XataClient } from "@/xata"

import { AspectRatio } from "@/components/ui/aspect-ratio"

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

  const { name, image, description, additional_images } = product
  return (
    <>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex justify-between">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            {name}
          </h1>
        </div>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">
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
          <p className="whitespace-pre-line max-w-xl">{description}</p>
        </div>
      </section>
    </>
  )
}

export default ProductPage
