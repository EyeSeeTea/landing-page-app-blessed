import { Instance } from "./data/entities/Instance";
import { Dhis2ConfigRepository } from "./data/repositories/Dhis2ConfigRepository";
import { InstanceDhis2Repository } from "./data/repositories/InstanceDhis2Repository";
import { NotificationsDefaultRepository } from "./data/repositories/NotificationsDefaultRepository";
import { CreateNotificationUseCase } from "./domain/usecases/CreateNotificationUseCase";
import { ListAllNotificationsUseCase } from "./domain/usecases/ListAllNotificationsUseCase";
import { ListUserNotificationsUseCase } from "./domain/usecases/ListUserNotificationsUseCase";
import { SearchUsersUseCase } from "./domain/usecases/SearchUsersUseCase";
import { UpdateNotificationsUseCase } from "./domain/usecases/UpdateNotificationsUseCase";

export function getCompositionRoot(instance: Instance) {
    const configRepository = new Dhis2ConfigRepository(instance);
    const notificationsRepository = new NotificationsDefaultRepository(instance, configRepository);
    const instanceRepository = new InstanceDhis2Repository(instance);

    return {
        usecases: {
            notifications: getExecute({
                list: new ListUserNotificationsUseCase(notificationsRepository),
                listAll: new ListAllNotificationsUseCase(notificationsRepository),
                update: new UpdateNotificationsUseCase(notificationsRepository),
                create: new CreateNotificationUseCase(notificationsRepository),
            }),
            instance: getExecute({
                searchUsers: new SearchUsersUseCase(instanceRepository),
            }),
        },
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
