import { TTaskRepository } from '@tasks/domain/repository';

type Dependencies = {
    repository: TTaskRepository;
};

export const buildDelete = ({ repository }: Dependencies) => {
    const service = async (id: number) => {
        await repository.delete(id);
    };

    return service;
};
