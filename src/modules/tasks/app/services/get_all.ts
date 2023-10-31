import { TTaskDOM, TTaskFilterDOM, TTaskOptions } from '@tasks/domain/entities';
import { TTaskRepository } from '@tasks/domain/repository';

type Dependencies = {
    repository: TTaskRepository;
};

export const buildGetAll = ({ repository }: Dependencies) => {
    const service = async (
        filter: TTaskFilterDOM,
        options: TTaskOptions,
    ): Promise<TTaskDOM[]> => {
        return await repository.getAll(filter, options);
    };

    return service;
};
