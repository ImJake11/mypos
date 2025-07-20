import { TransactionDetailsModel } from "@/app/lib/models/transactionModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {

        const {
            transactionData
        } = await req.json();

        const rawData: TransactionDetailsModel = transactionData;


        await prisma.transactionDetails.create({
            data: {
                reason: rawData.reason ?? undefined,
                referenceTransactionID: rawData.transactionReferenceID,
                amountPaid: rawData.amountPaid,
                changeGiven: rawData.changeGiven,
                exemptSales: rawData.exemptSales,
                netTotal: rawData.netTotal,
                nonTaxableSales: rawData.nonTaxableSales,
                paymentMethod: rawData.paymentMethod,
                status: rawData.status,
                taxablSales: rawData.taxablSales,
                totalValSales: rawData.totalValSales,
                userid: rawData.userid,
                paymentProvider: rawData.paymentProvider,
                referenceId: String(rawData.referenceId),
                purchasedItems: {
                    createMany: {
                        data: rawData.purchasedItems.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            vatStatus: item.vatStatus,
                            bulkTierID: item.bulkTierID,
                        })),
                    }
                }
            }
        });

        for (const item of rawData.purchasedItems) {

            await prisma.variants.update({
                where: {
                    id: item.productId,
                },
                data: {
                    stock: {
                        increment: item.quantity,
                    }
                }
            });

            await prisma.product.update({
                where: {
                    id: item.mainProductId,
                },
                data: {
                    stock: {
                        increment: item.quantity,
                    }
                }
            });
        }

        console.log("Success");
        return NextResponse.json({ message: "Process successful" }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}