import { NotificationFilterType } from "../../enum/notificationType";
import { NotificationModel } from "../../models/notificationModel";


export async function fetchNotifications(currentLength: number,
    limit: number, isRead: boolean, filter?: NotificationFilterType,
): Promise<NotificationModel[]> {

    try {
        const res = await fetch(`/api/notification?offset=${currentLength}&&limit=${limit}&&filter=${filter}&&isread=${isRead}`, {
            method: "GET",
        })

        if (!res.ok) {
            throw new Error("Failed to fetch notifications");
        }
        const { notifications } = await res.json();

        return notifications;

    } catch (e) {
        throw new Error("Failed to load notifications")
    }
}