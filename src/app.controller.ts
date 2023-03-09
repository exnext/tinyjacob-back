import { Controller, Post, Body } from '@nestjs/common';
import { Sequelize, DataTypes } from 'sequelize';
import { createHash } from 'crypto'

@Controller()
export class AppController {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/db/tiny-jacob.sqlite'
  });

  Hash = this.sequelize.define('Hash', {
    link: {type: DataTypes.TEXT},
    hash: {type: DataTypes.TEXT}
  }, {
    freezeTableName: true,
    timestamps: false
  });

  @Post('/link/:link')
  async uploadHash(@Body() par): Promise<string> {
    if (par.link == '')
      return 'false';

    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');

      const hashes = await this.Hash.findAndCountAll({
        where: { link: par.link }
      });
      if (hashes.count !== 0) // jeśli link istniał już w bazie
        return hashes.rows[0].dataValues.hash;

      let link = par.link;
      
      while (true) {
        const hash = createHash('md5');
        hash.update(link);
        const hashedLink = hash.digest('hex').substring(0, 8);

        const numHash = await this.Hash.count({
          where: { hash: hashedLink }
        });
        if(numHash !== 0) // jeśli link istnieje i mimo to hash jest w bazie
          link += Math.floor(Math.random() * 1000);
        else {
          await this.Hash.create({
            link: par.link, 
            hash: hashedLink
          });

          return hashedLink;
        }
      }
    } catch (error) {
      console.log(error);
      return 'false';
    }
  }

  @Post('/hash/:hash')
  async uploadLink(@Body() par): Promise<string> {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');

      const links = await this.Hash.findAndCountAll({
        where: { hash: par.hash }
      });
      if (links.count === 0) { // jeśli podany hash nie istnieje jeszcze w bazie
        return 'false';
      }

      return links.rows[0].dataValues.link;
    } catch (error) {
      console.log(error);
      return 'false';
    }
  }
}
