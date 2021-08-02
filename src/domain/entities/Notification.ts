import { NamedRef } from "./Ref";

export interface AppNotification {
    id: string;
    content: string;
    recipients: NotificationRecipients;
    readBy: UserReadNotification[];
    createdAt: Date;
}

interface NotificationRecipients {
    users: NamedRef[];
    userGroups: NamedRef[];
}

interface UserReadNotification {
    id: string;
    date: Date;
}
