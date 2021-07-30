import { UseCase } from "../../compositionRoot";
import { NotificationsRepository } from "../repositories/NotificationsRepository";

export class CreateNotificationUseCase implements UseCase {
    constructor(private notificationsRepository: NotificationsRepository) {}

    public async execute(content: string, recipients: string[]): Promise<void> {
        return this.notificationsRepository.create(content, recipients);
    }
}
