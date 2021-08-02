import { InstanceRepository } from "../../domain/repositories/InstanceRepository";
import { D2Api } from "../../types/d2-api";
import { cache } from "../../utils/cache";
import { Instance } from "../entities/Instance";
import { UserSearch } from "../entities/SearchUser";
import { User } from "../entities/User";
import { getD2APiFromInstance } from "../utils/d2-api";

export class InstanceDhis2Repository implements InstanceRepository {
    private api: D2Api;

    constructor(instance: Instance) {
        this.api = getD2APiFromInstance(instance);
    }

    public getBaseUrl(): string {
        return this.api.baseUrl;
    }

    public async searchUsers(query: string): Promise<UserSearch> {
        const options = { fields, filter: { displayName: { ilike: query } } };
        return this.api.metadata.get({ users: options, userGroups: options }).getData();
    }

    @cache()
    public async getCurrentUser(): Promise<User> {
        const d2User = await this.api.currentUser
            .get({
                fields: {
                    id: true,
                    displayName: true,
                    userGroups: { id: true, name: true },
                    userCredentials: {
                        username: true,
                        userRoles: { id: true, name: true, authorities: true },
                    },
                },
            })
            .getData();

        return {
            id: d2User.id,
            name: d2User.displayName,
            userGroups: d2User.userGroups,
            ...d2User.userCredentials,
        };
    }
}

const asName = { $fn: { name: "rename", to: "name" } } as const;
const fields = { id: true, displayName: asName };
