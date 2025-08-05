import { prisma } from "@/app/lib/utils/db/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {

    try {
        const cookieStore = await cookies();

        const email = cookieStore.get("email")?.value;

        await prisma.users.update({
            where: {
                email
            },
            data: {
                isActive: false,
            }
        });

        cookieStore.delete("email");
        cookieStore.delete("session_token");

        return NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        )

    } catch (e) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}