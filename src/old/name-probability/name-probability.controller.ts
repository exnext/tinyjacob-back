import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { OldService } from '../old.service';

@Controller('name-probability')
export class DemoController {
  constructor(private readonly appService: OldService) {}

  @Get(':name')
  async getProbability(@Param() param) {
    console.log('pobrano dane');
    return this.appService.probabilityMessage(param);
  }
  @Get()
  getDefault() {
    return "This page allows you to check the country you're mostly probable to come from";
  }

  @Post()
  async uploadProbability(@Body() params) {
    console.log('Przesłano dane:', params.name);
    return this.appService.probabilityMessage(params);
  }
}
