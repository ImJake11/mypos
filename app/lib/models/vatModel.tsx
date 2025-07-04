import { ProductProps } from "./productModel";

export interface VatModel {
    id: string;
    settingKey: string;
    rate: number;
    lastModified: Date;
    description: string;
    products?: ProductProps[]
}