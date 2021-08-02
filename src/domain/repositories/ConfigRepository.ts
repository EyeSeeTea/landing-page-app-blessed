import { User } from "../../data/entities/User";

export interface ConfigRepository {
    getUser(): Promise<User>;
}
