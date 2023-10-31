import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = Bun.env.PORT || 5000;

(async () => {
    try {
        const app = await NestFactory.create(AppModule);
        await app.listen(PORT);
        console.log(`Server Nest init in http://locahost:${PORT}`);
    } catch (e) {
        console.log(e);
        console.log('Error Init server');
    }
})();
