import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface ProductPageProps {}

const ProductPage: React.FunctionComponent<ProductPageProps> = () => {
  return (
    <>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex justify-between">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Upper Body <br className="hidden sm:inline" />
            Bands
          </h1>
          <h2 className="text-right text-3xl leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Bandas para el <br className="hidden sm:inline" />
            Tren Superior
          </h2>
        </div>
        <div className="flex justify-between w-full space-x-4">
          <div className="w-1/4">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/assets/UpperBody-0.jpg"
                alt="Photo by Alvaro Pinot"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="w-1/4">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/assets/UpperBody-1.jpg"
                alt="Photo by Alvaro Pinot"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="w-1/2">
            <AspectRatio ratio={2 / 1}>
              <Image
                src="/assets/UpperBody-2.jpg"
                alt="Photo by Alvaro Pinot"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductPage
