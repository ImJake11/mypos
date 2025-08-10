import { ActivityLog } from "@/app/lib/models/ActivityLogModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { cookies } from "next/headers";
import { getUserId } from "./getUserID";


export async function createNewActivityLog(params: ActivityLog) {

    try {
        const user = await getUserId() ?? "uknown user";

        await prisma.activityLogs.create({
            data: {
                action: params.action,
                status: params.status,
                userId: params.userId ?? user,
                relatedId: params.relatedId,
            }
        });

    } catch (e) {
        throw new Error("Server Error");
    }
}