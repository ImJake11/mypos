import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {

        const notificationsCount = await prisma.notifications.count({
            where: {
                isRead: false,
            }
        });

        return NextResponse.json({ notificationsCount }, { status: 200 });
        
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" });
    }
}