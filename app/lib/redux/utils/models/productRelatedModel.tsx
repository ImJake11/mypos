import { VariantsProps } from "@/app/lib/models/productModel";


export interface VariantActionModel<K extends keyof VariantsProps> {
    name: K,
    data: VariantsProps[K],
    index: number,
}