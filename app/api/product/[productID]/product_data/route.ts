import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { productID: string } }) {

    const { productID } = await params;

    try {

        if (!productID) return NextResponse.json({ error: "No product found" }, { status: 404 });

        const product = await prisma.product.findUnique({
            where: {
                id: productID,
            },
            include: {
                variants: true,
                bulkTier: true,
                category: true,
                promotionalDiscount: true,
                vatStatus: true,
            }
        });

        return NextResponse.json({ product }, { status: 200 });


    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}