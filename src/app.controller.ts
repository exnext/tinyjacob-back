import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Sequelize, DataTypes } from 'sequelize';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post(':link')
  async upload(@Body() par): Promise<string> {
    if (par.link == '')
      return 'Puste dane';

    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'src/db/tiny-jacob.sqlite'
    });
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

      const Hash = sequelize.define('Hash', {
        link: {type: DataTypes.TEXT},
        hash: {type: DataTypes.TEXT}
      }, {
        freezeTableName: true,
        timestamps: false
      });

      const link: any = par.link.split('//');
      let [, ...rest] = link[link.length - 1].split('/');
      rest = rest.join('/').replace('?', '')
      const numHashes = await Hash.count({
        where: { 'hash': rest }
      });
      if (numHashes === 0) {
        await Hash.create({
          'link': par.link, 
          'hash': rest
        });
      } else {
        rest += ' | rekord istniał już w bazie'
      }

      return 'tiny-jacob.pl?hash=' + rest;
    } catch (error) {
      console.log(error);
      return 'Error: connection with database couldn\'t be established';
    }
  }
}
