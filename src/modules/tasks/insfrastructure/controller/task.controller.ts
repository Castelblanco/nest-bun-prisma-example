import { HttpSuccessCode } from '@common/enums/success_enum';
import { TMappers } from '@common/mappers_wrappers/mappers';
import { ApiError } from '@common/response/errors/api_error';
import { ApiReponse } from '@common/response/success/api_responses';
import { ListResponse } from '@common/response/success/list_responses';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { TasksMappers } from '@tasks/app/mapper';
import { TaskServices } from '@tasks/app/services/index.service';
import { TTaskAPI } from '@tasks/domain/dto';
import { TTaskDOM, TTaskFilterDOM, TTaskOptions } from '@tasks/domain/entities';

type TQuery = TTaskFilterDOM & TTaskOptions;

@Controller('tasks')
export class TaskController {
    mappers: TMappers<TTaskDOM, TTaskAPI>;

    constructor(private readonly services: TaskServices) {
        this.mappers = new TasksMappers();
    }

    @Get('get-all')
    async getAll(@Query() query: TQuery): Promise<ListResponse<TTaskAPI>> {
        try {
            const tasks = await this.services.getAll(
                {
                    title: query.title,
                },
                {
                    limit: +query.limit || 20,
                    offset: +query.offset || 0,
                },
            );
            return new ListResponse(
                tasks.map(this.mappers.domToApi),
                HttpSuccessCode.SUCCESSFUL,
            );
        } catch (e) {
            const err = new ApiError(e);
            throw new HttpException(err, err.code);
        }
    }

    @Get('get-by-id/:id')
    async getById(@Param('id') id: string): Promise<ApiReponse<TTaskAPI>> {
        try {
            const task = await this.services.getById(+id);
            return new ApiReponse(
                this.mappers.domToApi(task),
                HttpSuccessCode.SUCCESSFUL,
            );
        } catch (e) {
            const err = new ApiError(e);
            throw new HttpException(err, err.code);
        }
    }

    @Post('create')
    async create(@Body() task: TTaskAPI): Promise<ApiReponse<TTaskAPI>> {
        try {
            const newTask = await this.services.create(
                this.mappers.apiToDom(task),
            );

            return new ApiReponse(
                this.mappers.domToApi(newTask),
                HttpSuccessCode.SUCCESSFUL,
            );
        } catch (e) {
            const err = new ApiError(e);
            throw new HttpException(err, err.code);
        }
    }

    @Put('update/:id')
    async update(
        @Param('id') id: string,
        @Body() task: TTaskAPI,
    ): Promise<ApiReponse<TTaskAPI>> {
        try {
            if (!task._id) task._id = +id;
            const updateTask = await this.services.update(
                this.mappers.apiToDom(task),
            );

            return new ApiReponse(
                this.mappers.domToApi(updateTask),
                HttpSuccessCode.SUCCESSFUL,
            );
        } catch (e) {
            const err = new ApiError(e);
            throw new HttpException(err, err.code);
        }
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
        try {
            await this.services.delete(+id);
            return;
        } catch (e) {
            const err = new ApiError(e);
            throw new HttpException(err, err.code);
        }
    }
}
