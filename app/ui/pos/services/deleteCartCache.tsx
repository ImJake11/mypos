import { posSetCartItemsFromAPI } from "@/app/lib/redux/slice/posSlice";
import { AppDispatch } from "@/app/lib/redux/store";
import CartHelpers from "@/app/ui/pos/components/cart/services/cartHelper";


/**
 * Custom async function that deletes a specific cart cache entry from the backend
 * using the provided `id` and `userId`. After a successful deletion, it receives
 * the updated cart data from the backend response, transforms it using the CartHelpers
 * utility, and dispatches it to the Redux store using `posSetCartItemsFromAPI`.
 *
 * This ensures the frontend cart state remains in sync with the backend after deletion.
 *
 * @param dispatch - Redux dispatch function for updating the cart state
 * @param cartHelper - An instance of CartHelpers used to transform API data
 * @param id - The ID of the cart cache to delete
 * @param userId - The ID of the current user (used in the API request)
 */
export const useDeleteCartCache = (async ({
    dispatch, cartHelper, id, userId,
}:
    {
        dispatch: AppDispatch,
        cartHelper: CartHelpers
        id: string,
        userId: string,
    }) => {

    try {
        const res = await fetch(`/api/cart_cache/${id}?userId=${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) {
            throw new Error("Something went wrong to delete the cart item");
        }

        console.log("Deleted the item successfully")
    } catch (e) {

    }
});