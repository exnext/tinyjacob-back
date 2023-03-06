import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { NameProbabilityController } from './name-probability/name-probability.controller';
import { MenuController } from './menu/menu.controller';
import { FancyTextController } from './fancy-text/fancy-text.controller';
import { FileHandlerController } from './file-handler/file-handler.controller';

@Module({
  imports: [],
  controllers: [AppController, DemoController, NameProbabilityController, MenuController, FancyTextController, FileHandlerController],
  providers: [AppService],
})
export class AppModule {}
