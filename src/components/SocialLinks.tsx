import { Icons } from "@/ui/icons"

import { siteConfig } from "@/lib/site"

const SocialLinks = () => (
  <div className="flex space-x-1">
    <a target="_blank" rel="noreferrer" href={siteConfig.links.instagram}>
      <Icons.instagram className="mr-2 h-5 w-5" />
    </a>
    <a target="_blank" rel="noreferrer" href={siteConfig.links.facebook}>
      <Icons.facebook className="mr-2 h-5 w-5 fill-current" />
    </a>
  </div>
)

export default SocialLinks
