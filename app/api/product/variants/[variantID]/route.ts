
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { variantID: string } }) {

    const { variantID } = await params;
    try {

        const data = await prisma.variants.findUnique({
            where: {
                id: variantID,
            }
        });

        if (!data) {
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }

        return NextResponse.json({
            url: data.imageUrl,
            name: data.name,
        }, { status: 200 });

    } catch (e) {
        return NextResponse.json({
            error: "Internal Server Error"
        }, { status: 500 })
    }
}