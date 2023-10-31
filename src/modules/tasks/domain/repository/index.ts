import { TTaskDOM, TTaskFilterDOM, TTaskOptions } from '../entities';

export type TTaskRepository = {
    getAll: (
        filter: TTaskFilterDOM,
        options: TTaskOptions,
    ) => Promise<TTaskDOM[]>;
    getById: (id: number) => Promise<TTaskDOM>;
    create: (task: TTaskDOM) => Promise<TTaskDOM>;
    update: (task: TTaskDOM) => Promise<TTaskDOM>;
    delete: (id: number) => Promise<void>;
};
