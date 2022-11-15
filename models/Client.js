import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Client = sequelize.define('clients', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  budget: {
    type: DataTypes.FLOAT(10),
    allowNull: false,
  },
});
