import { TWrappers } from '@common/mappers_wrappers/wrappers';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { TTaskDOM, TTaskFilterDOM, TTaskOptions } from '@tasks/domain/entities';
import { TTaskRepository } from '@tasks/domain/repository';
import { TTaskDAL } from '../models';
import { PrismaService } from '@db/prisma/prisma.service';
import { TaskWrappers } from '../wrappers';
import { StorageError } from '@common/response/errors/storage_error';
import { ErrorResourceNotFound } from '@common/response/errors/resource_not_found';

@Injectable()
export class TasksPrismaRepository implements TTaskRepository {
    db: Prisma.TaskDelegate<DefaultArgs>;
    wrappers: TWrappers<TTaskDOM, TTaskDAL>;
    filterKeysIf: Record<
        keyof TTaskFilterDOM,
        (o: Prisma.TaskWhereInput, v: string) => Prisma.TaskWhereInput
    >;

    constructor(private readonly prisma: PrismaService) {
        this.db = prisma.task;
        this.wrappers = new TaskWrappers();
        this.filterKeysIf = {
            title: (o, v) => ({
                ...o,
                title: {
                    contains: v,
                },
            }),
        };
    }

    getAll = async (
        filter: TTaskFilterDOM,
        options: TTaskOptions,
    ): Promise<TTaskDOM[]> => {
        try {
            const tasks = await this.db.findMany({
                where: this.filterDomToDal(filter),
                skip: options.offset,
                take: options.limit,
            });

            return tasks.map(this.wrappers.dalToDom);
        } catch (e) {
            console.log(e);
            throw new StorageError(e);
        }
    };

    getById = async (id: number): Promise<TTaskDOM> => {
        try {
            const task: TTaskDAL | null = await this.db.findUnique({
                where: {
                    id,
                },
            });

            if (!task)
                throw new ErrorResourceNotFound(
                    `this task with _id: ${id}, not exits`,
                );

            return this.wrappers.dalToDom(task);
        } catch (e) {
            throw new StorageError(e);
        }
    };

    create = async (task: TTaskDOM): Promise<TTaskDOM> => {
        try {
            const newTask = await this.db.create({
                data: this.wrappers.domToDal(task),
            });

            return this.wrappers.dalToDom(newTask);
        } catch (e) {
            throw new StorageError(e);
        }
    };

    update = async (task: TTaskDOM): Promise<TTaskDOM> => {
        try {
            const updateTask = await this.db.update({
                where: {
                    id: task.id,
                },
                data: this.wrappers.domToDal(task),
            });

            return this.wrappers.dalToDom(updateTask);
        } catch (e) {
            throw new StorageError(
                new ErrorResourceNotFound(
                    `this task with _id: ${task.id}, not exit`,
                ),
            );
        }
    };

    delete = async (id: number): Promise<void> => {
        try {
            await this.db.delete({
                where: {
                    id,
                },
            });
        } catch (e) {
            throw new StorageError(
                new ErrorResourceNotFound(
                    `this task with _id: ${id}, not exit`,
                ),
            );
        }
    };

    filterDomToDal = (filter?: TTaskFilterDOM): Prisma.TaskWhereInput => {
        if (!filter) return;

        let options: Prisma.TaskWhereInput = {};

        Object.keys(filter).forEach((key) => {
            const value = filter[key as keyof TTaskFilterDOM];

            options = this.filterKeysIf[key as keyof TTaskFilterDOM](
                options,
                value,
            );
        });

        return options;
    };
}
