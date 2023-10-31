import { BaseError } from './base_error';
import { HttpErrorCode } from '../../enums/errors_enum';

export class ErrorResourceNotFound extends BaseError {
    constructor(message: string, metadata?: any) {
        super(
            message,
            HttpErrorCode.RESOURCE_NOT_FOUND,
            HttpErrorCode.RESOURCE_NOT_FOUND,
            metadata,
        );
    }
}
