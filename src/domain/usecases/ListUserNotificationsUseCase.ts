import { UseCase } from "../../compositionRoot";
import { AppNotification } from "../entities/Notification";
import { NotificationsRepository } from "../repositories/NotificationsRepository";

export class ListUserNotificationsUseCase implements UseCase {
    constructor(private notificationsRepository: NotificationsRepository) {}

    public async execute(): Promise<AppNotification[]> {
        return this.notificationsRepository.list();
    }
}
