import { TransactionDetailsModel } from "@/app/lib/models/transactionModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * API Route: POST /api/transaction
 * 
 * This route handles the creation of a full transaction record.
 * 
 * Flow:
 * 1. Validates incoming transaction data from the request body.
 * 2. Saves the main transaction summary (e.g., totals, payment method, discount).
 * 3. Loops through each purchased item:
 *    - Saves each as a `transactionItem` tied to the transactionId.
 *    - Updates the stock for both the variant and the main product.
 * 4. Returns a success response when all operations complete.
 * 
 * On failure, returns appropriate HTTP status codes with error messages.
 * 
 * Expected Input:
 * - `transactionData`: {
 *     amountPaid, changeGiven, totals, paymentMethod, userid, purchasedItems[], ...
 *   }
 * 
 * Success Response:
 * - 200 OK with confirmation message
 * 
 * Error Response:
 * - 400 Bad Request if input is missing
 * - 500 Internal Server Error on unexpected failures
 */
export async function POST(req: NextRequest) {

    try {

        const { transactionData } = await req.json();


        if (transactionData === undefined) {
            return NextResponse.json({ error: "Transaction data is undefined" }, { status: 400 });
        }

        const details: TransactionDetailsModel = transactionData

        console.log(typeof details.referenceId)

        const { transactionId } = await prisma.transactionDetails.create({

            data: {
                status: details.status,
                amountPaid: details.amountPaid,
                changeGiven: details.changeGiven,
                exemptSales: details.exemptSales,
                netTotal: details.netTotal,
                nonTaxableSales: details.nonTaxableSales,
                paymentProvider: details.paymentProvider,
                paymentMethod: details.paymentMethod,
                taxablSales: details.taxablSales,
                totalValSales: details.totalValSales,
                referenceId: details.referenceId ?? undefined,
                userid: details.userid,
                discountID: details.discountID,
            },
            select: {
                transactionId: true,
            }
        });

        await Promise.all(details.purchasedItems.map(async (item) => {

            // save to transaction items
            await prisma.transactionItems.create({
                data: {
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    vatStatus: item.vatStatus,
                    transactionId: transactionId,

                }
            })

            // update variant stock
            await prisma.variants.update({
                where: {
                    id: item.productId,
                },
                data: {
                    stock: {
                        decrement: item.quantity,
                    }
                }
            });

            // updated main product stock
            await prisma.product.update({
                where: {
                    id: item.mainProductId,
                },
                data: {
                    stock: {
                        decrement: item.quantity,
                    }
                }
            });
        }));

        return NextResponse.json({ message: "Successfully saved transaction data" }, { status: 200 })

    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}



export async function GET() {

    try {


        const transactions = await prisma.transactionDetails.findMany({
            orderBy: {
                date: "desc"
            }
        });

        const safeTransactions = transactions.map((t) => ({
            ...t,
            referenceId: Number(t.referenceId),
        }));

        return NextResponse.json({ transactions: safeTransactions }, { status: 200 });

    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}