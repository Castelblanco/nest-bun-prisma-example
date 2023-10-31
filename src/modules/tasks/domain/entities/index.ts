export type TTaskDOM = {
    id: number;
    title: string;
    description?: string;
};

export type TTaskFilterDOM = {
    title?: string;
};

export type TTaskOptions = {
    limit: number;
    offset: number;
};

export class TaskDOM implements TTaskDOM {
    id: number;
    title: string;
    description?: string;

    constructor(task: TTaskDOM) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
    }
}
