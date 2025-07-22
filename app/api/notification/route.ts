import { NotificationFilterType } from "@/app/lib/enum/notificationType";
import { prisma } from "@/app/lib/utils/db/prisma";
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;

    const offset = searchParams.get('offset');

    const limit = searchParams.get('limit')

    const now = new Date();

    const filterParams = searchParams.get("filter");

    console.log(filterParams);

    try {
        let where: any = {};

        if (filterParams) {

            if (filterParams === NotificationFilterType.TODAY) {

                const endDate = new Date(now);
                const startDate = new Date(now);
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);

                where.createdAt = {
                    gte: startDate,
                    lte: endDate,
                }

            } else if (filterParams === NotificationFilterType.ALL) {
                delete where.type;
            } else {
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