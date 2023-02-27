import { XataClient as XataAuthClient } from "./codegen/auth";
import { XataClient as XataShop } from "./codegen/shop";

const Xata = {
    auth: new XataAuthClient(),
    shop: new XataShop(),
}

export default Xata;