import { Injectable } from '@nestjs/common';
import { version } from '../../../package.json';

export type Healthy = {
    version: string;
    message: string;
};

@Injectable()
export class AppService {
    get(): Healthy {
        return {
            version,
            message: 'server running 👩‍💻',
        };
    }
}
