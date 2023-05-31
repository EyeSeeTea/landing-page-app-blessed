import { AppNotification } from "../entities/Notification";

export interface NotificationsRepository {
    list(): Promise<AppNotification[]>;
    listAll(): Promise<AppNotification[]>;
    dhis2MessageCount(): Promise<number>;
    save(notifications: AppNotification[]): Promise<void>;
    delete(notifications: string[]): Promise<void>;
}
