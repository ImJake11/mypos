import { transactionSetData, transactionSetError, transactionSetLoading } from "@/app/lib/redux/slice/transactionSlice";
import { useEffect } from "react"
import { useDispatch } from "react-redux";


export const useFetchTransactions = ((
    { onSuccess, onError }:
        {
            onSuccess?: () => void,
            onError?: () => void,
        }
) => {

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {

            try {
                dispatch(transactionSetLoading(true));
                const res = await fetch("/api/transactions", {
                    method: "GET",
                });

                if (!res.ok) {
                    dispatch(transactionSetLoading(false))
                    throw new Error("Something went wrong");
                }

                const { transactions } = await res.json();

                dispatch(transactionSetData(transactions))

            } catch (e) {
                dispatch(transactionSetError(true));
                throw new Error("Failed to fetch data")
            } finally {
                dispatch(transactionSetLoading(false));
            }
        }

        fetchData();
    }, []);
})