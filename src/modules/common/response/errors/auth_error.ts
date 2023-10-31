import { BaseError } from './base_error';
import { HttpErrorCode } from '../../enums/errors_enum';

export class ErrorAuth extends BaseError {
    constructor(message: string, httpCode: number, metadata?: any) {
        super(`${message}`, HttpErrorCode.FORBIDDEN, httpCode, metadata);
    }
}
