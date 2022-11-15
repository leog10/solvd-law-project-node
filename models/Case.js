import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Case = sequelize.define('cases', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});
