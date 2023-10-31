import { Controller, Get } from '@nestjs/common';
import { AppService, Healthy } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    get(): Healthy {
        return this.appService.get();
    }
}
