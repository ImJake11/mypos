import { ProductProps } from "../../models/productModel";

export async function fetchSingleProductData(id: string): Promise<ProductProps> {

    try {

        const res = await fetch(`/api/product/${id}/product_data`, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error("Server Error");
        }

        const { product } = await res.json();

        return product;

    } catch (e) {
        throw new Error("Failed to fetch product");
    }
}