import { UseCase } from "../../compositionRoot";
import { Notification } from "../entities/Notification";
import { NotificationsRepository } from "../repositories/NotificationsRepository";

export class ListAllNotificationsUseCase implements UseCase {
    constructor(private notificationsRepository: NotificationsRepository) {}

    public async execute(): Promise<Notification[]> {
        return this.notificationsRepository.listAll();
    }
}
