import { TransactionStatus } from "@/app/lib/enum/transactionStatus";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getStartAndEndDate } from "../../services/geCurrentTimezone";
import { ProductSummaryProp } from "@/app/lib/redux/slice/dashboardSlice";

interface Summary {
    netTotal: number,
    taxablSales: number,
    totalValSales: number,
    expenses: number,
}


export async function GET(req: NextRequest) {

    const dateTime = getStartAndEndDate(0);
    const start = dateTime.start;
    const end = dateTime.end;

    try {

        const dailySummary = await fetchDailyTransactionSums(start, end, true)

        const recentTransactions = await fetchRecentTransactions(start, end);


        // get timezone yesterday
        const yesterDate = getStartAndEndDate(1);
        const yesterdaySummary = await fetchDailyTransactionSums(yesterDate.start, yesterDate.end, false);

        const data = { dailySummary, recentTransactions, yesterdaySummary };

        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



async function fetchRecentTransactions(start: Date, end: Date) {

    try {
        const recentTransactions = await prisma.transactionDetails.findMany({
            where: {
                date: {
                    gte: start,
                    lte: end,
                }
            },
            select: {
                status: true,
                date: true,
                transactionId: true,
                paymentProvider: true,
            }
        });
        return recentTransactions;

    } catch (e) {
        throw new Error("Error fetching recent transactions");
    }
}

async function fetchDailyTransactionSums(start: Date, end: Date, isCalculateExpenses: boolean): Promise<Summary> {

    try {

        let dailySummary: Summary = {
            netTotal: 0,
            taxablSales: 0,
            totalValSales: 0,
            expenses: 0
        };


        const summary = await prisma.transactionDetails.groupBy({
            by: ['status'],
            where: {
                date: {
                    gte: start,
                    lte: end,
                }
            },
            _sum: {
                netTotal: true,
                taxablSales: true,
                totalValSales: true,
            }
        });

        summary.forEach(data => {

            // destructure data sums
            const { netTotal, taxablSales, totalValSales } = data._sum;

            if (data.status === TransactionStatus.COMPLETED) {
                dailySummary = {
                    ...dailySummary,
                    netTotal: dailySummary.netTotal + Number(netTotal),
                    taxablSales: dailySummary.taxablSales + Number(taxablSales),
                    totalValSales: dailySummary.totalValSales + Number(totalValSales),
                }
            } else {
                dailySummary = {
                    ...dailySummary,
                    netTotal: dailySummary.netTotal - Number(netTotal),
                    taxablSales: dailySummary.taxablSales - Number(taxablSales),
                    totalValSales: dailySummary.totalValSales - Number(totalValSales),
                }
            }

        })



        let expenses = 0;

        if (isCalculateExpenses) {
            const computeExpenses = await prisma.productExpenses.aggregate({
                _sum: {
                    total: true
                }
            });
            expenses = computeExpenses._sum.total ?? 0;
        }

        dailySummary.expenses = expenses;

        return dailySummary;

    } catch (e) {
        throw new Error("Server Error")
    }

}