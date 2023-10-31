import { HttpErrorCode } from '../../enums/errors_enum';
export class BaseError extends Error {
    code: number;
    status: number;
    _stack: any;
    error: string;
    metadata: any;

    constructor(
        message: string,
        code: number,
        status?: number,
        metadata?: any,
    ) {
        super(message || 'Default error');
        this.error = this.message;
        this.code = code || HttpErrorCode.UNDEFINED;
        this.status = status || HttpErrorCode.INTERNAL_SERVER_ERROR;
        this._stack = this.stack;
        this.metadata = metadata;
    }
}
