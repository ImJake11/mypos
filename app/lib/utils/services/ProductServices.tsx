import ToasEnum from "../../enum/toastEnum";
import { AppDispatch } from "../../redux/store"
import { openToas } from "../../redux/toastSlice";

class ProductServices {
    private dispatch: AppDispatch;

    constructor({ dispatch }: { dispatch: AppDispatch }) {
        this.dispatch = dispatch;
    }

    // handle add product to favorite
    public async addProductToFavorite({
        isFavorite, productId,
    }: { isFavorite: boolean, productId: string }) {

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
            this.dispatch(openToas({ message: "Failed to updated product as favorite", type: ToasEnum.ERROR }))
            return;
        }

        const toasMessage = isFavorite ? "Product added as favorite" : "Product removed from favorite";

        this.dispatch(openToas({ message: toasMessage, type: ToasEnum.SUCCESS }))
    }

}


export default ProductServices;