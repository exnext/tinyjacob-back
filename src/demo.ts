import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
// import { MessageDto } from './message.dto';

@Controller('demo')
export class DemoController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() + ' DEMO';
  }

  @Post()
  upload(@Body() message: any) {
    console.log(message);
    return message;
  }
}
