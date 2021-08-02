import { NamedRef } from "../../domain/entities/Ref";

export interface UserSearchItem {
    id: string;
    displayName: string;
}

export interface UserSearch {
    users: NamedRef[];
    userGroups: NamedRef[];
}
