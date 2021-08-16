import { User } from "../entities/User";

export interface ConfigRepository {
    getUser(): Promise<User>;
}
