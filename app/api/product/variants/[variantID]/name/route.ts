import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest,
    { params }:
        { params: Promise<{ variantID: string }> }
) {

    const { variantID } = await params;
    try {

        const data = await prisma.variants.findUnique({
            where: {
                id: variantID,
            },
            select: {
                name: true,
            }
        });

        if (!data) {
            return NextResponse.json({ error: "Not found" }, { status: 404 })
        }

        return NextResponse.json({ name: data.name }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}