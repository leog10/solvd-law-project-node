import Sequelize from 'sequelize';

export const sequelize = new Sequelize('default', 'default', 'secret', {
  host: 'localhost',
  dialect: 'postgres',
});
