import { getUbigeo } from "@/lib/utils/get-olva-shipping-price/get-ubigeo";

const departamento_name = "LIMA";
const provincia_name = "LIMA";
const distrito_name = "LIMA";

const ubigeo = getUbigeo(departamento_name, provincia_name, distrito_name);

console.log({ubigeo});