import { Controller, Get, Redirect, Param } from '@nestjs/common';

@Controller('menu')
export class MenuController {
    @Get() 
    getDefault() {
        return `Type:<br>
        - <a href="http://localhost:3001/menu/demo">localhost:3001/menu/demo</a> to get to the demo page<br>
        - <a href="http://localhost:3001/menu/main">localhost:3001/menu/main</a> to get to the main page<br>
        - <a href="http://localhost:3001/menu/name-probability">localhost:3001/menu/name-probability</a> to get to the name probability page<br>
        - <a href="http://localhost:3001/menu/file-handler">localhost:3001/menu/file-handler</a> to get to the name probability page<br>
        - <a href="http://localhost:3001/menu/react">localhost:3001/menu/react</a> to get to react page<br>
        - <a href="http://localhost:3001/menu/fancy-text">localhost:3001/menu/fancy-text</a> to get to fancy-text page`
    }
    @Get(':page')
    @Redirect()
    getThePage(@Param() params) {
        switch (params.page) {
            case 'demo':
                return { url: '/demo' };
            case 'main':
                return { url: '/' };
            case 'name-probability':
                return { url: '/name-probability' };
            case 'file-handler':
                return { url: '/file-handler' };
            case 'react':
                return { url: 'http://localhost:3000' };
            case 'fancy-text':
                return { url: '/fancy-text' };
        }   
    }
}