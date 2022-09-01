import _ from "lodash";
import { Codec, optional, string } from "purify-ts";
import { Config } from "../../domain/entities/Config";
import { Instance } from "../../domain/entities/Instance";
import { ConfigRepository } from "../../domain/repositories/ConfigRepository";
import { DataStoreStorageClient } from "../clients/storage/DataStoreStorageClient";

export class ConfigD2ApiRepository implements ConfigRepository {
    constructor(private instance: Instance) {}

    async get(): Promise<Config> {
        const storageClient = new DataStoreStorageClient("global", this.instance);
        const configValue = await storageClient.getObject("config");

        return ConfigCodec.decode(configValue).caseOf({
            Left: err => {
                console.error(`Error decoding config: ${err}`);
                return defaultConfig;
            },
            Right: config => {
                return { ...defaultConfig, ..._.pickBy(config) };
            },
        });
    }
}

const ConfigCodec = Codec.interface({
    fallbackUrl: optional(string),
    defaultProgramme: optional(string),
});

const defaultConfig: Config = {
    fallbackUrl: "/dhis-web-dashboard/index.action",
    defaultProgramme: undefined,
};
