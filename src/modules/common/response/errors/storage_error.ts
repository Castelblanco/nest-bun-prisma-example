import { HttpErrorCode } from '../../enums/errors_enum';
import { BaseError } from './base_error';
export class StorageError extends BaseError {
    constructor(metatada?: any) {
        super(
            'Storage error',
            metatada.code || HttpErrorCode.INTERNAL_SERVER_ERROR,
            metatada.status || HttpErrorCode.BAD_REQUEST,
            metatada,
        );
    }
}
