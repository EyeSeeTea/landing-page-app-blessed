export interface Notification {
    id: string;
    content: string;
    recipients: string[];
    readBy: ReadBy[];
} 
interface ReadBy {
    id: string;
    date: Date;
}