import { Config } from "../entities/Config";
import { Instance } from "../entities/Instance";

export interface ConfigRepository {
    get(): Promise<Config>;
}
