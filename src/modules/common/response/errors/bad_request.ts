import { BaseError } from './base_error';
import { HttpErrorCode } from '../../enums/errors_enum';

export class ErrorBadRequest extends BaseError {
    constructor(message: string, metadata?: any) {
        super(
            `${message}`,
            HttpErrorCode.BAD_REQUEST,
            HttpErrorCode.BAD_REQUEST,
            metadata,
        );
    }
}
