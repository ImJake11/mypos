
export interface ActivityLog {
    id?: string;
    timestamp?: Date;
    action: string;
    status: string;
    userId?: string;
    relatedId: string;
}
