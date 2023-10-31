import { TTaskDOM } from '@tasks/domain/entities';
import { TTaskRepository } from '@tasks/domain/repository';

type Dependencies = {
    repository: TTaskRepository;
};

export const buildGetById = ({ repository }: Dependencies) => {
    const service = async (id: number): Promise<TTaskDOM> => {
        return await repository.getById(id);
    };

    return service;
};
