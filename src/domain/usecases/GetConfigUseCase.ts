import { UseCase } from "../../compositionRoot";
import { Config } from "../entities/Config";
import { ConfigRepository } from "../repositories/ConfigRepository";

export class GetConfigUseCase implements UseCase {
    constructor(private configRepository: ConfigRepository) {}

    public async execute(): Promise<Config> {
        return this.configRepository.get();
    }
}
