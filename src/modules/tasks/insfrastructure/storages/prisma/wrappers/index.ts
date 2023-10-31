import { TWrappers } from '@common/mappers_wrappers/wrappers';
import { TTaskDAL, TaskDAL } from '../models';
import { TTaskDOM, TaskDOM } from '@tasks/domain/entities';

export class TaskWrappers implements TWrappers<TTaskDOM, TTaskDAL> {
    dalToDom = (item: TTaskDAL): TTaskDOM => {
        return new TaskDOM({
            id: item.id,
            title: item.title,
            description: item.description,
        });
    };

    domToDal = (item: TTaskDOM): TTaskDAL => {
        return new TaskDAL({
            id: item.id,
            title: item.title,
            description: item.description,
        });
    };
}
