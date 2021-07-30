import _ from "lodash";
import { Notification } from "../../domain/entities/Notification";
import { ConfigRepository } from "../../domain/repositories/ConfigRepository";
import { generateUid } from "../utils/uid";

import { DataStoreStorageClient } from "../clients/storage/DataStoreStorageClient";
import { Namespaces } from "../clients/storage/Namespaces";
import { StorageClient } from "../clients/storage/StorageClient";
import { NotificationsRepository } from "../../domain/repositories/NotificationsRepository";


export class NotificationsDefaultRepository implements NotificationsRepository {
    private storageClient: StorageClient;

    constructor(private config: ConfigRepository) {
        this.storageClient = new DataStoreStorageClient("global", config.getInstance());
    }

    public async list(): Promise<Notification[]> {
        try {
            const currentUser = await this.config.getUser();
            const notifications = await this.storageClient.listObjectsInCollection<Notification>(
                Namespaces.NOTIFICATIONS
            );
            const userNotifs = notifications
                                .filter(notification => notification.recipients.includes(currentUser.id))
                               .filter(userNotif => 
                                {   const readByUsers = userNotif.readBy.map(user => user.id)
                                    return !readByUsers.includes(currentUser.id)
                                });
            return userNotifs
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public async listAll(): Promise<Notification[]> {
        try {
            return await this.storageClient.listObjectsInCollection<Notification>(
                Namespaces.NOTIFICATIONS
            );            
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public async update(notifications: Notification[]): Promise<void> {
        const currentUser = await this.config.getUser();
        const date = new Date();
        const user = { id: currentUser.id, date };
        const updatedNotifications = notifications.map(notification => ({...notification, readBy: [...notification.readBy, user] }))
        await this.storageClient.saveObjectsInCollection<Notification>(Namespaces.NOTIFICATIONS, updatedNotifications)
        }

    public async create(content: string, recipients: string[]): Promise<void> {
        const newNotification: Notification = {
            id: generateUid(),
            content,
            recipients,
            readBy: [],
            createdAt: new Date()
        }
        await this.storageClient.saveObjectInCollection<Notification>(Namespaces.NOTIFICATIONS, newNotification)
        }
    }