import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {

    try {

        const { searchParams } = new URL(req.url!);

        const urlParms = await context.params;

        const { id } = urlParms;

        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User id required" }, { status: 400 });
        }

        await prisma.cartCache.delete({
            where: {
                cartId: id,
            },
        });

        // return the fresh data 
        const updatedCart = await prisma.cartCache.findMany({
            include: {
                bulkPricing: true,
                mainProduct: true,
                product: true,
                promotionalDiscount: true,
            },
            where: {
                userId,
            }
        });

        return NextResponse.json({ updatedCart }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Interval server error" }, { status: 500 });
    }
}