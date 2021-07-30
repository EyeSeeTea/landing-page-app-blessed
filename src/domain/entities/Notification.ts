export interface Notification {
    id: string;
    content: string;
    recipients: string[];
    readBy: ReadBy[];
    createdAt: Date;
}
interface ReadBy {
    id: string;
    date: Date;
}
