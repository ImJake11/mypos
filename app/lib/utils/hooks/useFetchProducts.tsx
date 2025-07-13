import { useEffect } from "react"
import { ProductProps } from "../../models/productModel";


export const useFetchProductList = (({ onSuccess, onError, onLoad, onFinal }: {
    onSuccess?: (data: ProductProps[]) => void,
    onError?: () => void,
    onLoad?: () => void,
    onFinal?: () => void,
}) => {

    useEffect(() => {

        // fetched all product 
        const fetchData = async () => {

            try {
                if (onLoad) onLoad();

                const res = await fetch('/api/product', {
                    method: "GET",
                    cache: "no-store",
                });

                if (!res.ok) {
                    if (onError) onError()
                    throw new Error("Failded to fetch products");
                }

                const { productData } = await res.json();

                if (onSuccess) onSuccess(productData);

            } catch (e) {
                if (onError) onError();
                throw new Error("Failed to fetch products");
            } finally {
                if (onFinal) onFinal();
            }
        }

        fetchData();

    }, []);
})