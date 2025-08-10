import { NotificationFilterType } from "@/app/lib/enum/notificationType";
import { NotificationModel } from "@/app/lib/models/notificationModel";
import { prisma } from "@/app/lib/utils/db/prisma";
import { cookies } from "next/headers";


export async function createNewNotification({
    message, title, type, relatedID, relatedTo
}: {
    message: string,
    title: string,
    type: NotificationFilterType,
    relatedID?: string,
    relatedTo?: string,
}): Promise<NotificationModel> {

    try {
        const cookieStore = await cookies();
        const user = cookieStore.get("email")?.value;

        const newData = await prisma.notifications.create({
            data: {
                message: message,
                title: title,
                type: type,
                relatedID: relatedID,
                relatedTo: relatedTo,
                userID: user,
            },
        });

        return newData as NotificationModel;

    } catch (e) {
        throw new Error("Failed to save new notification")
    }
}
