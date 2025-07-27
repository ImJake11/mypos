import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {

        const query = req.nextUrl.searchParams.get('query');

        const results = await prisma.product.findMany({
            where: {
                name: {
                    contains: query ?? '',
                    mode: "insensitive",
                }
            },
            select: {
                name: true,
                id: true,
            }
        })

        return NextResponse.json({ results }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}