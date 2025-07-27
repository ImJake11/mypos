import { ActivityLog } from "@/app/lib/models/ActivityLogModel";
import { prisma } from "@/app/lib/utils/db/prisma";


export async function createNewActivityLog(params: ActivityLog) {

    try {

        await prisma.activityLogs.create({
            data: {
                action: params.action,
                status: params.status,
                userId: "tempo",
                relatedId: params.relatedId,
            }
        });

    } catch (e) {
        throw new Error("Server Error");
    }
}