import { InstanceRepository } from "../../domain/repositories/InstanceRepository";
import { D2Api } from "../../types/d2-api";
import { Instance } from "../entities/Instance";
import { UserSearch } from "../entities/SearchUser";
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
}

const asName = { $fn: { name: "rename", to: "name" } } as const;
const fields = { id: true, displayName: asName };
