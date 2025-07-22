

export async function dismissNotification(id: string) {

    try {

        const res = await fetch(`/api/notification/${id}`, {
            method: "PUT",
        });

        if (!res.ok) {
            throw new Error("Server Error");
        }

        console.log("Dismissed the notification successfully");

    } catch (e) {
        throw new Error("Failed to perform process")
    }
}