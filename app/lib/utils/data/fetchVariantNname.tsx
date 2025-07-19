

export async function fetchVariantName(id: string): Promise<string> {
    try {
        const res = await fetch(`/api/product/variants/${id}/name`, {
            method: "GET",
        });

        if (!res.ok) {
            return "";
        }
        const { name } = await res.json();

        return name;
    } catch (e) {
        return "";
    }
}