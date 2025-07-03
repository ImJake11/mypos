import { FilterModel } from "../../../models/filterModel";
import { ProductProps } from "../../../models/productModel";


export async function filterProduct(
    filterData: FilterModel,
): Promise<ProductProps[]> {

    let searchParams = new URLSearchParams();

    const {
        maxPrice,
        maxStock,
        minPrice,
        minStock,
        withBulkPricing,
        withDiscount,
        categoryID,
        name,
    } = filterData;

    if (name) searchParams.append("name", name);
    if (categoryID) searchParams.append("category_id", categoryID); // Corrected typo 'categori_id' to 'category_id'
    if (minPrice !== undefined && minPrice !== null) searchParams.append("min_price", String(minPrice)); // Safer check for 0
    if (maxPrice !== undefined && maxPrice !== null) searchParams.append("max_price", String(maxPrice));
    if (minStock !== undefined && minStock !== null) searchParams.append("min_stock", String(minStock));
    if (maxStock !== undefined && maxStock !== null) searchParams.append("max_stock", String(maxStock));

    // Booleans: Ensure these are correctly converted on the frontend
    // If `withBulkPricing` is a boolean (true/false) from `filterData`, this is fine.
    // If it was derived from `Boolean(searchParams.get("with_bulk"))` which is problematic,
    // ensure `FilterModel` holds actual booleans derived safely.
    searchParams.append("with_bulk", String(withBulkPricing));
    searchParams.append("with_discounts", String(withDiscount));

    const param = `/api/product/filter?${searchParams.toString()}`;

    try {

        const res = await fetch(param, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error("Fetching products failed");
        }

        const { products } = await res.json();

        return products as ProductProps[];


    } catch (e) {
        throw new Error("Fetching products failed");
    }
}