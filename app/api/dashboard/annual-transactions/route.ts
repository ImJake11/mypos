import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {

    try {


        const transactions = await prisma.transactionDetails.groupBy({
            by: ['date'],
            where: {
                date: {
                    gte: new Date('2025-01-01'),
                    lte: new Date('2025-12-31'),
                }
            },
            _sum: {
                netTotal: true,
                taxablSales: true,
                exemptSales: true,
                totalValSales: true,
            }
        });

        return NextResponse.json({ transactions }, { status: 200 });

    } catch (e) {

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}