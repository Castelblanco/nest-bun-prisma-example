import { TMappers } from '@common/mappers_wrappers/mappers';
import { TTaskAPI, TaskAPI } from '@tasks/domain/dto';
import { TTaskDOM, TaskDOM } from '@tasks/domain/entities';

export class TasksMappers implements TMappers<TTaskDOM, TTaskAPI> {
    apiToDom = (item: TTaskAPI): TTaskDOM => {
        return new TaskDOM({
            id: item._id,
            title: item.title,
            description: item.description,
        });
    };

    domToApi = (item: TTaskDOM): TTaskAPI => {
        return new TaskAPI({
            _id: item.id,
            title: item.title,
            description: item.description,
        });
    };
}
