import { dashboardSetDailySummary } from "@/app/lib/redux/slice/dashboardSlice";
import store from "@/app/lib/redux/store";
import { AppDispatch } from "recharts/types/state/store";


export class DashboardServices {

    private dashboardState = store.getState().dashboarSlice;


    public async fetchDailySummary(dispatch: AppDispatch) {

        try {

            const res = await fetch("/api/dashboard/daily-transaction-summary", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error("Server Error");
            }

            const { dailySummary, yesterdaySummary, recentTransactions } = await res.json();

            console.log(yesterdaySummary);

            dispatch(dashboardSetDailySummary({
                dailySummary,
                yesterdaySummary,
                recentTransactions,
            }));

        } catch (e) {
            throw new Error("Failed to fetch data");
        }
    }
}