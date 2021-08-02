import { UseCase } from "../../compositionRoot";
import { AppNotification } from "../entities/Notification";
import { NotificationsRepository } from "../repositories/NotificationsRepository";

export class SaveNotificationsUseCase implements UseCase {
    constructor(private notificationsRepository: NotificationsRepository) {}

    public async execute(notifications: AppNotification[]): Promise<void> {
        return this.notificationsRepository.save(notifications);
    }
}
