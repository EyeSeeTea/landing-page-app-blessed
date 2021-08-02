import { UserSearch } from "../../data/entities/SearchUser";
import { User } from "../../data/entities/User";

export interface InstanceRepository {
    searchUsers(query: string): Promise<UserSearch>;
    getCurrentUser(): Promise<User>;
}

export interface UploadFileOptions {
    id?: string;
    name?: string;
}
