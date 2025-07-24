import { TransactionFilterKeys } from "@/app/lib/constants/TransactionFilterKeys";
import CloseIcon from "@/app/lib/icons/closeIcon";
import { TransactionFilterModel } from "@/app/lib/models/transactionFilterModel";
import { datePickerToggleVisibility } from "@/app/lib/redux/slice/datePickerSlice";
import { transactionUpdateFilterData } from "@/app/lib/redux/slice/transactionSlice";
import { RootState } from "@/app/lib/redux/store";
import { TransactionActions } from "@/app/lib/redux/utils/enums/transactionActions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";


function TransactionDateFilter() {

    const dispatch = useDispatch();

    const { endDate, startDate } = useSelector((state: RootState) => state.transaction.filterData);

    const start = new Date(startDate ?? "").toLocaleDateString("en-us", {
        dateStyle: "long"
    });
    const end = new Date(endDate ?? "").toLocaleDateString('en-us', {
        dateStyle: "long"
    });

    const removeDate = (key: string) => {
        dispatch(transactionUpdateFilterData({
            data: undefined,
            name: key as keyof TransactionFilterModel,
        }))
    }
    return <div className='flex flex-col w-full'>
        <span>Date Range Filter</span>
        <div className="h-[1rem]" />
        <div className="flex w-full gap-3 items-center">
            <ButtonTile name="Start Date" onClick={() => dispatch(datePickerToggleVisibility({
                context: TransactionActions.SET_START_DATE
            }))} />
            <div className="flex-1 h-[2rem] rounded-[8px] border border-gray-400 grid place-content-center">
                {start}
            </div>
            <button onClick={() => {
                removeDate(TransactionFilterKeys.startDate)
            }}>
                <CloseIcon />
            </button>
        </div>

        <div className="h-[2rem] w-[10rem] grid place-content-center">
            <div className="h-[2rem] w-[1px] border border-gray-400 border-dashed" />
        </div>

        <div className="flex w-full gap-3 items-center">
            <ButtonTile name="End Date" onClick={() => dispatch(datePickerToggleVisibility({
                context: TransactionActions.SET_END_DATE
            }))} />
            <div className="flex-1 h-[2rem] rounded-[8px] border border-gray-400 grid place-content-center">
                {end}
            </div>
            <button onClick={() => {
                removeDate(TransactionFilterKeys.endDate)
            }}>
                <CloseIcon />
            </button>
        </div>

    </div>
}

function ButtonTile({ name, onClick }: {
    name: string, onClick: () => void
}) {
    return <button className="w-[10rem] h-[2rem] rounded-[8px] button-primary-gradient grid place-content-center text-white"
        onClick={onClick}
    >
        {name}
    </button>
}


export default TransactionDateFilter;