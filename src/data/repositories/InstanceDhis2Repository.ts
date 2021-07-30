import _ from "lodash";
import { ConfigRepository } from "../../domain/repositories/ConfigRepository";
import { InstanceRepository } from "../../domain/repositories/InstanceRepository";
import { D2Api } from "../../types/d2-api";
import { UserSearch } from "../entities/SearchUser";
import { getD2APiFromInstance } from "../utils/d2-api";

export class InstanceDhis2Repository implements InstanceRepository {
    private api: D2Api;

    constructor(config: ConfigRepository) {
        this.api = getD2APiFromInstance(config.getInstance());
    }

    public getBaseUrl(): string {
        return this.api.baseUrl;
    }

    public async searchUsers(query: string): Promise<UserSearch> {
        const options = {
            fields: { id: true, displayName: true },
            filter: { displayName: { ilike: query } },
        };

        return this.api.metadata.get({ users: options, userGroups: options }).getData();
    }
}
