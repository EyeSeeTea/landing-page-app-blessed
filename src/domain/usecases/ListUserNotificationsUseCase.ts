import { UseCase } from "../../compositionRoot";
import { Notification } from "../entities/Notification";
import { NotificationsRepository } from "../repositories/NotificationsRepository";

export class ListUserNotificationsUseCase implements UseCase {
    constructor(private notificationsRepository: NotificationsRepository) {}

    public async execute(): Promise<Notification[]> {
        return this.notificationsRepository.list();
    }
}
