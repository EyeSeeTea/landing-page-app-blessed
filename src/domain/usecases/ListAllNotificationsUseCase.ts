import { UseCase } from "../../compositionRoot";
import { AppNotification } from "../entities/Notification";
import { NotificationsRepository } from "../repositories/NotificationsRepository";

export class ListAllNotificationsUseCase implements UseCase {
    constructor(private notificationsRepository: NotificationsRepository) {}

    public execute(): Promise<AppNotification[]> {
        return this.notificationsRepository.listAll();
    }
}
