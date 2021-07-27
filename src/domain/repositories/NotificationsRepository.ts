import { Notification } from "../entities/Notification";

export interface NotificationsRepository {
    list(): Promise<Notification[]>;
    update(notifications: Notification[]): Promise<void>;

}
