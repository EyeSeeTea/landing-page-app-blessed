import { AppNotification } from "../entities/Notification";

export interface NotificationsRepository {
    list(): Promise<AppNotification[]>;
    listAll(): Promise<AppNotification[]>;
    save(notifications: AppNotification[]): Promise<void>;
    delete(notifications: string[]): Promise<void>;
}
