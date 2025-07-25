import { TransactionStatus } from "@/app/lib/enum/transactionStatus";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Summary {
    netTotal: number,
    taxablSales: number,
    totalValSales: number,
    expenses: number,
}

export async function GET(req: NextRequest) {

    try {

        const now = new Date();
        const start = new Date(now.getDate() - 100);
        const end = new Date(now);

        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        let dailySummary = await handleFetch({ start, end })

        const transactionStatus = await prisma.transactionDetails.findMany({
            where: {
                date: {
                    lte: end,
                    gte: start,
                },
            },
            select: {
                status: true,
            }
        })

        console.log(transactionStatus);

        // set date for yesterday
        start.setDate(now.getDate() - 1);
        end.setDate(now.getDate() - 1);

        let yesterdaySummary = await handleFetch({ start, end });


        return NextResponse.json({ dailySummary, yesterdaySummary, transactionStatus }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

async function handleFetch({
    start,
    end,
}: {
    start: Date,
    end: Date,

}): Promise<Summary> {

    try {

        const summary = await prisma.transactionDetails.aggregate({
            where: {
                status: TransactionStatus.COMPLETED,
                date: {
                    gte: start,
                    lte: end,
                }
            },
            _count: true,
            _sum: {
                netTotal: true,
                taxablSales: true,
                totalValSales: true,
            }
        });

        const expenses = await prisma.productExpenses.aggregate({
            where: {
                timestamp: {
                    gte: start,
                    lte: end,
                }
            },
            _sum: {
                total: true
            }
        });

        const { netTotal, taxablSales, totalValSales } = summary._sum;
        const { total } = expenses._sum;

        const dataSummary: Summary = {
            netTotal: netTotal ? Number(netTotal) : 0,
            taxablSales: taxablSales ? Number(taxablSales) : 0,
            totalValSales: totalValSales ? Number(totalValSales) : 0,
            expenses: total ? total : 0,
        }

        return dataSummary;

    } catch (e) {
        throw new Error("Server Error")
    }

}