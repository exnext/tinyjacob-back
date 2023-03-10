import { Controller, Post, Body } from '@nestjs/common';
import { Response, sequelize, Hash } from '../app.service'

@Controller('hash')
export class HashController {
    @Post(':hash')
    async uploadLink(@Body() par): Promise<Response> {
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
  
        const links = await Hash.findAndCountAll({
          where: { hash: par.hash }
        });
        if (links.count === 0) { // jeśli podany hash nie istnieje jeszcze w bazie
          return {content: '', error: 'unknownHash'};
        }
  
        return {content: 'http://' + links.rows[0].dataValues.link, error: ''};
      } catch (error) {
        console.log(error);
        return {content: '', error: 'dbConnection'};
      }
    }
}
