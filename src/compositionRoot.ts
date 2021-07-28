import { Dhis2ConfigRepository } from "./data/repositories/Dhis2ConfigRepository";
import { NotificationsDefaultRepository } from "./data/repositories/NotificationsDefaultRepository";
import { ListUserNotificationsUseCase } from "./domain/usecases/ListUserNotificationsUseCase";
import { ListAllNotificationsUseCase } from "./domain/usecases/ListAllNotificationsUseCase";

import { UpdateNotificationsUseCase } from "./domain/usecases/UpdateNotificationsUseCase";

export function getCompositionRoot(_baseUrl: string) {
    const configRepository = new Dhis2ConfigRepository(_baseUrl);
    const notificationsRepository = new NotificationsDefaultRepository(configRepository);

    return {
        usecases: {
            notifications: getExecute({
                list: new ListUserNotificationsUseCase(notificationsRepository),
                listAll: new ListAllNotificationsUseCase(notificationsRepository),
                update: new UpdateNotificationsUseCase(notificationsRepository)
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
