export type TTaskDAL = {
    id: number;
    title: string;
    description?: string;
};

export type TTaskFilterDAL = {
    title?: string;
};

export class TaskDAL implements TTaskDAL {
    id: number;
    title: string;
    description?: string;

    constructor(task: TTaskDAL) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
    }
}
