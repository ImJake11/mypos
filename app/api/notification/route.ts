import { NotificationFilterType } from "@/app/lib/enum/notificationType";
import { prisma } from "@/app/lib/utils/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getStartAndEndDate } from "../services/geCurrentTimezone";
import io from "socket.io-client";
import { getUserId } from "../services/getUserID";

const socket = io(process.env.SOCKET_URL || "");

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;

    const offset = searchParams.get('offset');

    const limit = searchParams.get('limit');

    const now = new Date();

    const filterParams = searchParams.get("filter");
    const isReadParams = searchParams.get("isread");

    try {
        const userID = await getUserId();

        let where: any = {
            isRead: isReadParams === 'true' ? true : false,
            userID,
        };

        if (filterParams) {

            if (filterParams === NotificationFilterType.TODAY) {

                const getDate = getStartAndEndDate(0);

                where.createdAt = {
                    gte: getDate.start,
                    lte: getDate.end,
                }

            } else if (filterParams !== NotificationFilterType.ALL) {
                where.type = filterParams
            }
        }

        const notifications = await prisma.notifications.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            take: limit ? Number(limit) : undefined,
            skip: offset ? Number(offset) : undefined,
        });

        return NextResponse.json({ notifications }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {

    try {
        const userID = await getUserId();

        await prisma.notifications.updateMany({
            where: {
                userID,
                isRead: {
                    equals: false,
                }
            },
            data: {
                isRead: true,
            }
        });

        if (socket) {
            socket.emit("notification_event", { type: "all-read" });
        }

        return NextResponse.json({ message: "Successfully Mark All as Read" }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}