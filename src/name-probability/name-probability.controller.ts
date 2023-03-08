import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';

type probability = {
    country: {
        country_id: string,
        probability: number
    }[],
    name: string
}

@Controller('name-probability')
export class NameProbabilityController {
    constructor(private readonly appService: AppService) {}

    @Get(':name')
    async getProbability(@Param() param) {
        return this.appService.probabilityMessage(param);
    }
    @Get()
    getDefault() {
        return "This page allows you to check the country you're mostly probable to come from";
    }

    @Post()
    async uploadProbability(@Body() params) {
        return this.appService.probabilityMessage(params);
    }
}
