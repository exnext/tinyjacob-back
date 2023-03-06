import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from '../app.service';

@Controller('file-handler')
export class FileHandlerController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getGreeting() {
        return "Welcome"
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileSize(@UploadedFile() file) {
        console.log(`File ${file.originalname} size of ${this.appService.bToKb(file.size)} KB`);
        return {'fileSize': this.appService.bToKb(file.size) + 'KB'};
    }
}
