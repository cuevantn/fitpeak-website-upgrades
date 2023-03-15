import { Heading } from "@/ui/typography"

import { BagActions } from "./bag-actions/index"
import BagList from "./bag-list"
import { BagSummary } from "./bag-summary"

const BagPage = () => {
  return (
    <div className="container">
      <Heading>Bolso</Heading>
      <div>
        <BagList />

        <BagSummary />

        <BagActions />
      </div>
    </div>
  )
}

export default BagPage
