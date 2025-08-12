import { TransactionDetailsModel } from "@/app/lib/models/transactionModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import io from "socket.io-client";
import { createNewActivityLog } from "../../services/createNewActivityLog";
import { createNewNotification } from "../../services/createNotification";
import { NotificationFilterType } from "@/app/lib/enum/notificationType";

const socket = io(process.env.SOCKET_URL || "");

export async function POST(req: NextRequest) {

    const {
        transactionData
    } = await req.json();

    const rawData: TransactionDetailsModel = transactionData;

    try {

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
                            mainProductId: item.mainProductId,
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
                    id: item.mainProductId!,
                },
                data: {
                    stock: {
                        increment: item.quantity,
                    }
                }
            });
        }

        if (socket) {
            await createNewNotification({
                message: "Transaction refunded successfully",
                title: "Transaction",
                type: NotificationFilterType.SUCCESSFUL,
                relatedID: transactionData.id,
            })
        }

        await createNewActivityLog({
            action: `Refund a Transaction`,
            relatedId: transactionData.id ?? "",
            status: "SUCCESSFUL",
        })

        return NextResponse.json({ message: "Process successful" }, { status: 200 });

    } catch (e) {

        if (socket) {
            await createNewNotification({
                message: "Transaction refunded failed",
                title: "Transaction",
                type: NotificationFilterType.ERROR,
                relatedID: rawData.transactionId,
            })
        }

        await createNewActivityLog({
            action: `Refund a Transaction`,
            relatedId: "",
            status: "FALILED",
        });

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}