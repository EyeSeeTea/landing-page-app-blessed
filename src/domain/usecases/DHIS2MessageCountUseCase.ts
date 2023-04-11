import { UseCase } from "../../compositionRoot";
import { NotificationsRepository } from "../repositories/NotificationsRepository";

export class DHIS2MessageCountUseCase implements UseCase {
    constructor(private notificationsRepository: NotificationsRepository) {}

    public execute(): Promise<number> {
        return this.notificationsRepository.dhis2MessageCount();
    }
}
