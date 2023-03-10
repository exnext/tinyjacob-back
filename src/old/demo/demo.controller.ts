import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OldService } from '../old.service';

@Controller('demo')
export class DemoController {
  constructor(private readonly appService: OldService) {}

  @Get()
  getHello() {
    return this.appService.getHello() + 'DEMO';
  }

  @Get(':importance/:underline&:center')
  getHedingHello(
    @Param('importance') imp: number,
    @Param('underline') underline: string,
    @Param('center') center: string,
  ) {
    let ul = 'none',
      ta = 'left';
    if (underline == 'true') ul = 'underline';
    if (center == 'true') ta = 'center';
    return `<h${imp} style="text-decoration: ${ul}; text-align: ${ta};">${this.appService.getHello()}</h${imp}>`;
  }

  @Post()
  upload(@Body() message) {
    if (message.name != undefined && message.id != undefined)
      this.appService.goodbye(message);
    else {
      message = { error: 'incomplete data' };
    }

    return message;
  }
}
