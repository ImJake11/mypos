import ToasEnum from "@/app/lib/enum/toastEnum";
import { AppDispatch } from "@/app/lib/redux/store";
import { openToas } from "@/app/lib/redux/slice/toastSlice";


export async function inventoryServiceUpdateProductFavorite({

    isFavorite, productId, dispatch,
}: {
    isFavorite: boolean,
    productId: string,
    dispatch: AppDispatch,
}) {

    const res = await fetch(`/api/product/${productId}/favorite`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            isFavorite: isFavorite,
        })
    });

    if (!res.ok) {
        dispatch(openToas({ message: "Failed to updated product as favorite", type: ToasEnum.ERROR }))
        return;
    }

    const toasMessage = isFavorite ? "Product added as favorite" : "Product removed from favorite";

    dispatch(openToas({ message: toasMessage, type: ToasEnum.SUCCESS }))
}
