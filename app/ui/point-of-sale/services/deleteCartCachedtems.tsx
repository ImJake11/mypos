


export const useDeleteCartCachedItems = async () => {

    try {

        const userId = "tempo";

        const res = await fetch(`/api/cart_cache?userId=${userId}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error("Server error");
        }

        console.log("Successffully deleted cart items");

    } catch (e) {
        throw new Error("Delete cart items failed");
    }
}