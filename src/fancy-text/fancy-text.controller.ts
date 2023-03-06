import { Controller, Get, Query, Post, Body } from '@nestjs/common';

@Controller('fancy-text')
export class FancyTextController {
    @Get()
    getFancyText(@Query('color') color: string, @Query('size') size: number): string {
      return `<div style="color: ${color}; font-size: ${size}px;">Lorem ipsum</div>`;
    }

    @Post()
    uploadFancyTextStyles(@Body() params) {
        if (params.color == undefined)
            params.color = 'black';
        if (params.size == undefined)
            params.size = 15;
        return {
            'color': params.color, 
            'font-size': params.size + 'px'
        };    
    }
}