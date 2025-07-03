import { CategoryModel } from "@/app/lib/models/categoryModel";


export async function fetchAllCategory(): Promise<CategoryModel[]> {

    try {

        const res = await fetch('/api/category', {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error("Something went wrong fetching category");
        }

        const { categoryData } = await res.json();

        return categoryData;

    } catch (e) {
        throw new Error("Failed to fetch categories");
    }
}