interface SiteConfig {
  name: string
  description: string
  links: {
    facebook: string
    instagram: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Fitpeak",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  links: {
    facebook: "https://www.facebook.com/fitpeak.shop",
    instagram: "https://www.instagram.com/fitpeak.shop",
  },
}
