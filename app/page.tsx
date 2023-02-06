interface LandingPageProps {}

const LandingPage: React.FunctionComponent<LandingPageProps> = () => {
  return (
    <div className="container mt-10 text-center">
      <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        <span className="text-gray-400">Welcome to </span>fitpeak.shop
      </h1>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        <span className="text-gray-400">Welcome to </span>your peak
      </h1>
    </div>
  )
}

export default LandingPage
