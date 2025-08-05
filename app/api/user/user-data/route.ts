import { prisma } from "@/app/lib/utils/db/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {
        const cookiesStore = await cookies();

        const email = cookiesStore.get("email")?.value;

        if (!email) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }

        const userData = await prisma.users.findUnique({
            where: { email },
            select: { photoUrl: true, username: true }
        });

        if (!userData) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(
            { userData },
            { status: 200 },
        );

    } catch (e) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}