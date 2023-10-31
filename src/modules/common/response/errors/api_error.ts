import { HttpErrorCode } from '../../enums/errors_enum';
import { BaseError } from './base_error';
class ApiError {
    code: number;
    message: string;
    metadata: any;

    constructor(err: any) {
        if (err instanceof BaseError) {
            this.code = err.code || HttpErrorCode.UNDEFINED;
            this.message = err.message || 'Internal server error';
            this.metadata = err.metadata;
            return;
        }

        if (err instanceof Error) {
            this.code = HttpErrorCode.INTERNAL_SERVER_ERROR;
            this.message = err.message || 'Internal server error';
            return;
        }

        this.code = HttpErrorCode.INTERNAL_SERVER_ERROR;
        this.message = 'Unknow error';
    }
}

export { ApiError };
