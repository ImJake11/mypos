import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";
import { getUserId } from "../../services/getUserID";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const userId = await getUserId();

        if (!userId) {
            return NextResponse.json({ error: "User id required" }, { status: 400 });
        }

        await prisma.cartCache.delete({
            where: {
                cartId: id,
            },
        });

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
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
