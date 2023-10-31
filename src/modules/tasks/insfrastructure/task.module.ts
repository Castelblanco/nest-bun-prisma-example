import { Module } from '@nestjs/common';
import { TaskController } from './controller/task.controller';
import { TaskServices } from '@tasks/app/services/index.service';
import { PrismaService } from '@db/prisma/prisma.service';
import { TASKS_SERVICES } from '@common/enums/services/tasks';
import { TasksPrismaRepository } from './storages/prisma/implementations/tasks';

@Module({
    controllers: [TaskController],
    providers: [
        TaskServices,
        PrismaService,
        {
            provide: TASKS_SERVICES.PRISMA_REPO,
            useClass: TasksPrismaRepository,
        },
    ],
})
export class TasksModule {}
