import { Dhis2ConfigRepository } from "./data/repositories/Dhis2ConfigRepository";
import { NotificationsDefaultRepository } from "./data/repositories/NotificationsDefaultRepository";
import { ListNotificationsUseCase } from "./domain/usecases/ListNotificationsUseCase";
import { UpdateNotificationUseCase } from "./domain/usecases/UpdateNotificationUseCase";

export function getCompositionRoot(_baseUrl: string) {
    const configRepository = new Dhis2ConfigRepository(_baseUrl);
    const notificationsRepository = new NotificationsDefaultRepository(configRepository);

    return {
        usecases: {
            notifications: getExecute({
                list: new ListNotificationsUseCase(notificationsRepository),
                update: new UpdateNotificationUseCase(notificationsRepository)
            })
        }    
    };
}

export type CompositionRoot = ReturnType<typeof getCompositionRoot>;

function getExecute<UseCases extends Record<Key, UseCase>, Key extends keyof UseCases>(
    useCases: UseCases
): { [K in Key]: UseCases[K]["execute"] } {
    const keys = Object.keys(useCases) as Key[];
    const initialOutput = {} as { [K in Key]: UseCases[K]["execute"] };

    return keys.reduce((output, key) => {
        const useCase = useCases[key];
        const execute = useCase.execute.bind(useCase) as UseCases[typeof key]["execute"];
        output[key] = execute;
        return output;
    }, initialOutput);
}

export interface UseCase {
    execute: Function;
}
