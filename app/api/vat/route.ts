import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {

    try {

        const vats = await prisma.vat.findMany()

        return NextResponse.json({ vats }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}