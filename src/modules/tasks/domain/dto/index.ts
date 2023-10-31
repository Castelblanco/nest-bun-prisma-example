export type TTaskAPI = {
    _id: number;
    title: string;
    description?: string;
};

export class TaskAPI implements TTaskAPI {
    _id: number;
    title: string;
    description?: string;

    constructor(task: TTaskAPI) {
        this._id = task._id;
        this.title = task.title;
        this.description = task.description;
    }
}
