import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "../../services/getUserID";


export async function GET(req: NextRequest) {

    try {
        const userID = await getUserId();

        const now = new Date();

        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);


        const notificationsCount = await prisma.notifications.count({
            where: {
                userID,
                isRead: false,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                }
            }
        });

        return NextResponse.json({ notificationsCount }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" });
    }
}