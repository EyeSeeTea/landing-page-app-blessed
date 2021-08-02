export interface Notification {
    id: string;
    content: string;
    recipients: string[];
    readBy: UserReadNotification[];
    createdAt: Date;
}

interface UserReadNotification {
    id: string;
    date: Date;
}
