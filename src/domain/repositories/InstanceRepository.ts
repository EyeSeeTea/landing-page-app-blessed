import { UserSearch } from "../../data/entities/SearchUser";

export interface InstanceRepository {
    searchUsers(query: string): Promise<UserSearch>;
}

export interface UploadFileOptions {
    id?: string;
    name?: string;
}
