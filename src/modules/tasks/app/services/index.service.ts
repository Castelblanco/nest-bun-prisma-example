import { Inject, Injectable } from '@nestjs/common';
import { TTaskRepository } from '../../domain/repository';
import { TTaskDOM, TTaskFilterDOM, TTaskOptions } from '../../domain/entities';
import { buildGetAll } from './get_all';
import { TASKS_SERVICES } from '@common/enums/services/tasks';
import { buildGetById } from './get_by_id';
import { buildCreate } from './create';
import { buildUpdate } from './update';
import { buildDelete } from './delete';

@Injectable()
export class TaskServices {
    getAll: (
        filter: TTaskFilterDOM,
        options: TTaskOptions,
    ) => Promise<TTaskDOM[]>;
    getById: (id: number) => Promise<TTaskDOM>;
    create: (task: TTaskDOM) => Promise<TTaskDOM>;
    update: (task: TTaskDOM) => Promise<TTaskDOM>;
    delete: (id: number) => Promise<void>;

    constructor(
        @Inject(TASKS_SERVICES.PRISMA_REPO)
        private readonly repository: TTaskRepository,
    ) {
        this.getAll = buildGetAll({ repository });
        this.getById = buildGetById({ repository });
        this.create = buildCreate({ repository });
        this.update = buildUpdate({ repository });
        this.delete = buildDelete({ repository });
    }
}
