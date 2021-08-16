import { UseCase } from "../../compositionRoot";
import { NotificationsRepository } from "../repositories/NotificationsRepository";

export class DeleteNotificationsUseCase implements UseCase {
    constructor(private notificationsRepository: NotificationsRepository) {}

    public execute(ids: string[]): Promise<void> {
        return this.notificationsRepository.delete(ids);
    }
}
