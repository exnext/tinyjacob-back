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

      const hashes = await Hash.findAll();
      console.log(JSON.stringify(hashes));

      let link: any = par.link.split('//');
      let [, ...res] = link[link.length - 1].split('/');
      return 'ok.pl?hash='+res.join('/').replace('?', '');
    } catch (error) {
      console.log(error);
      return 'Errror';
    }
  }
}
