interface ProductHeadProps {
  params: { slug: string }
}

const ProductHead: React.FunctionComponent<ProductHeadProps> = ({
  params: slug,
}) => {
  return (
    <>
      <title>Fitpeak Resistance Band</title>
    </>
  )
}

export default ProductHead
