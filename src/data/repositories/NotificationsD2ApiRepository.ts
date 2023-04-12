import _ from "lodash";
import { Instance } from "../../domain/entities/Instance";
import { AppNotification } from "../../domain/entities/Notification";
import { InstanceRepository } from "../../domain/repositories/InstanceRepository";
import { NotificationsRepository } from "../../domain/repositories/NotificationsRepository";
import { DataStoreStorageClient } from "../clients/storage/DataStoreStorageClient";
import { Namespaces } from "../clients/storage/Namespaces";
import { StorageClient } from "../clients/storage/StorageClient";
import { D2Api, Id } from "../../types/d2-api";
import { getD2APiFromInstance } from "../../utils/d2-api";

interface MessageConversations {
    messageConversations: {
        id: Id;
        displayName: string;
    }[];
}

export class NotificationsD2ApiRepository implements NotificationsRepository {
    private storageClient: StorageClient;
    private api: D2Api;

    constructor(instance: Instance, private instanceRepository: InstanceRepository) {
        this.storageClient = new DataStoreStorageClient("global", instance);
        this.api = getD2APiFromInstance(instance);
    }

    public async list(): Promise<AppNotification[]> {
        try {
            const currentUser = await this.instanceRepository.getCurrentUser();
            const notifications = await this.storageClient.listObjectsInCollection<AppNotification>(
                Namespaces.NOTIFICATIONS
            );

            return notifications
                .filter(notification => {
                    const isForUser = notification.recipients.users.find(({ id }) => id === currentUser.id);
                    const isForGroup = notification.recipients.userGroups.find(({ id }) =>
                        currentUser.userGroups.find(group => id === group.id)
                    );

                    return isForUser || isForGroup;
                })
                .filter(notification => !notification.readBy.find(({ id }) => id === currentUser.id));
        } catch (error: any) {
            console.error(error);
            return [];
        }
    }

    public async listAll(): Promise<AppNotification[]> {
        try {
            return await this.storageClient.listObjectsInCollection<AppNotification>(Namespaces.NOTIFICATIONS);
        } catch (error: any) {
            console.error(error);
            return [];
        }
    }

    public async dhis2MessageCount(): Promise<number> {
        const { messageConversations } =
            (await this.api
                .get<MessageConversations>("/messageConversations.json?filter=read%3Aeq%3Afalse")
                .getData()) ?? [];

        return messageConversations.length;
    }

    public async save(notifications: AppNotification[]): Promise<void> {
        const currentUser = await this.instanceRepository.getCurrentUser();
        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            readBy: _.uniqBy(
                [...notification.readBy, { id: currentUser.id, name: currentUser.name, date: new Date() }],
                ({ id }) => id
            ),
        }));

        await this.storageClient.saveObjectsInCollection<AppNotification>(
            Namespaces.NOTIFICATIONS,
            updatedNotifications
        );
    }

    public async delete(notifications: string[]): Promise<void> {
        await this.storageClient.removeObjectsInCollection(Namespaces.NOTIFICATIONS, notifications);
    }
}
