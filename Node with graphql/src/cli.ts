import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { ConsoleModule } from './console/console.module';

(async () => {
    const app = await NestFactory.createApplicationContext(ConsoleModule);
    app.select(CommandModule).get(CommandService).exec();
})();