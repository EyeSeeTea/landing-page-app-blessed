import { UseCase } from "../../compositionRoot";
import { Notification } from "../entities/Notification";
import { NotificationsRepository } from "../repositories/NotificationsRepository";

export class UpdateNotificationsUseCase implements UseCase {
    constructor(private notificationsRepository: NotificationsRepository) {}

    public async execute(notifications: Notification[]): Promise<void> {
        return this.notificationsRepository.update(notifications);
    }
}
