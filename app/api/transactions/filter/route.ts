import { TransactionFilterKeys } from "@/app/lib/constants/TransactionFilterKeys";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {

        const params = req.nextUrl.searchParams;

        const {
            minimunNetTotal,
            maximumNetTotal,
            startDate,
            endDate,
            exemptTran,
            mixedTran,
            paymentOption,
            providedPayment,
            transactionStatus,
            vatableTran,
            zeroRatedTran,
        } = TransactionFilterKeys;

        let where: any = {};

        const paramMinNetTotal = params.get(minimunNetTotal);
        const paramMaxNetTotal = params.get(maximumNetTotal);
        if (paramMinNetTotal || paramMaxNetTotal) {
            where.netTotal = {};
            if (paramMinNetTotal) where.netTotal.gte = Number(paramMinNetTotal);
            if (paramMaxNetTotal) where.netTotal.lte = Number(paramMaxNetTotal);
        }

        const paramStartDate = params.get(startDate);
        const paramEndDate = params.get(endDate);
        if (paramStartDate || paramEndDate) {

            const endDate = new Date(paramEndDate!);
            endDate.setDate(endDate.getDate() + 1);
            const endIso = endDate.toISOString();

            where.date = {};
            if (paramStartDate) where.date.gte = paramStartDate;
            if (paramEndDate) where.date.lte = endIso;
        }

        const paramMixedTran = params.get(mixedTran);
        if (paramMixedTran !== 'true') {

            const paramVatableTran = params.get(vatableTran);
            if (paramVatableTran === "true") {
                where.taxablSales = { gt: 0 }
            }

            const paramZeroTran = params.get(zeroRatedTran);
            if (paramZeroTran === "true") {
                where.nonTaxableSales = { gt: 0 }
            }

            const paramExemptTran = params.get(exemptTran);
            if (paramExemptTran === "true") {
                where.exemptSales = { gt: 0 }
            }

        }

        const paramTransactionStatus = params.get(transactionStatus)
        if (paramTransactionStatus && paramTransactionStatus !== "All") {
            where.status = paramTransactionStatus
        }

        const paramPaymentOpt = params.get(paymentOption);
        if (paramPaymentOpt && paramPaymentOpt !== "All") {
            where.paymentMethod = paramPaymentOpt
        }

        const paramPaymentProv = params.get(providedPayment);
        if (paramPaymentProv) {
            where.paymentProvider = paramPaymentProv
        }

        const data = await prisma.transactionDetails.findMany({
            where,
            include: {
                purchasedItems: true,
            }
        });

        return NextResponse.json({ data }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }



}