import { TransactionDetailsModel } from "@/app/lib/models/transactionModel";
import store from "@/app/lib/redux/store";


export default class TransactionServices {

    private filterData = store.getState().transaction.filterData;

    public async applyFilterData(): Promise<TransactionDetailsModel[]> {

        try {

            const searchParams = this.getSearchParameters();

            const res = await fetch(`/api/transactions/filter?${searchParams}`, {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error("Server error");
            }

            const { data } = await res.json();
            console.log(data);
            return data as TransactionDetailsModel[];

        } catch (e) {
            throw new Error();
        }
    }

    private getSearchParameters(): string {

        const query = Object.entries(this.filterData).reduce((acc, [key, value]) => {

            if (value !== undefined && value !== null) {
                acc[key] = String(value);
            }
            return acc;

        }, {} as Record<string, string>);

        return new URLSearchParams(query).toString();
    }

}