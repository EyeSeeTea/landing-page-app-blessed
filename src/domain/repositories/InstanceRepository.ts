import { UserSearch } from "../entities/SearchUser";
import { User } from "../entities/User";

export interface InstanceRepository {
    searchUsers(query: string): Promise<UserSearch>;
    getCurrentUser(): Promise<User>;
    getInstanceVersion(): Promise<string>;
}
