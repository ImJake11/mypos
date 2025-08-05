import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {


    try {
        const { id } = await params;

        const data = await prisma.transactionDetails.findUnique({
            where: {
                transactionId: id,
            },
            include: {
                purchasedItems: {
                    include: {
                        product: {
                            select: {
                                productId: true,
                                imageUrl: true,
                                name: true,
                            }
                        },
                        bulkTier: true,
                    }
                },

            }
        });

        if (!data) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        console.log(data);
        return NextResponse.json({ data }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}