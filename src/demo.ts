import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('demo')
export class DemoController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() + ' DEMO';
  }

  @Post()
  upload(param: any) {
    console.log(param);
  }
}
