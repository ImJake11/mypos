import { prisma } from "@/app/lib/utils/db/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createNewActivityLog } from "../../services/createNewActivityLog";


export async function PUT(req: NextRequest) {

    try {
        const cookieStore = await cookies();

        const email = cookieStore.get("email")?.value;
        const session_token = cookieStore.get("session_token")?.value;

        await prisma.users.update({
            where: {
                email,
            },
            data: {
                isActive: false,
            }
        });

        await prisma.sessionToken.delete({
            where: {
                email,
                token: session_token,
            }
        })

        cookieStore.delete("email");
        cookieStore.delete("session_token");

        await createNewActivityLog({
            action: "SIGNED OUT",
            relatedId: email ?? "",
            status: "SUCCESSFUL",
            userId: email,
        });

        return NextResponse.json(
            { redirect: "/ui/auth/sign-in-page" },
            { status: 200 }
        )

    } catch (e) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}