import { TTaskDOM } from '@tasks/domain/entities';
import { TTaskRepository } from '@tasks/domain/repository';

type Dependencies = {
    repository: TTaskRepository;
};

export const buildUpdate = ({ repository }: Dependencies) => {
    const service = async (task: TTaskDOM): Promise<TTaskDOM> => {
        return await repository.update(task);
    };

    return service;
};
