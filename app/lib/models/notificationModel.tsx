

export interface NotificationModel {
    id: string;
    title: string;
    message: string;
    type: "SUCCESSFUL" | "ERROR" | "WARNING" | "SYSTEM";
    createdAt: Date;
    isRead?: boolean;
    relatedTo?: string;
    relatedID?: string;
}