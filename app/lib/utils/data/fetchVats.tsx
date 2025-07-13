import { VatModel } from "@/app/lib/models/vatModel";

export async function fetchVats(): Promise<VatModel[]> {

    try {

        const res = await fetch("/api/vat", {
            method: "GET",
        });

        const { vats } = await res.json();

        return vats as VatModel[];

    } catch (e) {
        throw new Error("Failed to fetch vats");
    }
}