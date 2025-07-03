import { ProductProps } from "../../../models/productModel";


export async function fetchAllProducts(): Promise<ProductProps[]> {

    try {

        const res = await fetch('/api/product', {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error("Fetching product error");
        }

        const { productData } = await res.json();

        return productData;

    } catch (e) {

        throw new Error("Internal Server Error");
    }
}