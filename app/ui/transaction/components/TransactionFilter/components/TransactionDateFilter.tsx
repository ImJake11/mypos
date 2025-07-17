import { datePickerToggleVisibility } from "@/app/lib/redux/slice/datePickerSlice";
import { RootState } from "@/app/lib/redux/store";
import { TransactionActions } from "@/app/lib/redux/utils/enums/transactionActions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";


function TransactionDateFilter() {

    const dispatch = useDispatch();

    const { endDate, startDate } = useSelector((state: RootState) => state.transaction.filterData);

    return <div className='flex flex-col w-full'>
        <span>Date Range Filter</span>
        <div className="h-[1rem]" />
        <div className="flex w-full gap-3">
            <ButtonTile name="Start Date" onClick={() => dispatch(datePickerToggleVisibility({
                context: TransactionActions.SET_START_DATE
            }))} />
            <div className="flex-1 h-[3rem] rounded-[8px] border border-[var(--border-default-dark)] grid place-content-center">
                {startDate}
            </div>
        </div>

        <div className="h-[2rem] w-[10rem] grid place-content-center">
            <div className="h-[2rem] w-[1px] border border-[var(--border-default-dark)] border-dashed" />
        </div>

        <div className="flex w-full gap-3">
            <ButtonTile name="End Date" onClick={() => dispatch(datePickerToggleVisibility({
                context: TransactionActions.SET_END_DATE
            }))} />
            <div className="flex-1 h-[3rem] rounded-[8px] border border-[var(--border-default-dark)] grid place-content-center">
                {endDate}
            </div>
        </div>

    </div>
}

function ButtonTile({ name, onClick }: {
    name: string, onClick: () => void
}) {
    return <button className="w-[10rem] h-[3rem] rounded-[8px] button-primary-gradient grid place-content-center"
        onClick={onClick}
    >
        {name}
    </button>
}


export default TransactionDateFilter;