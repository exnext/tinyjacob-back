import { Injectable } from '@nestjs/common';
import { Sequelize, DataTypes } from 'sequelize';

export type Response = {
  content: string,
  error: string
};

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/db/tiny-jacob.sqlite'
});

export const Hash = sequelize.define('Hash', {
  link: {type: DataTypes.TEXT},
  hash: {type: DataTypes.TEXT}
}, {
  freezeTableName: true,
  timestamps: false
});

@Injectable()
export class AppService {}
