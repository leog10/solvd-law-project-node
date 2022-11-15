import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Staff = sequelize.define('staff', {
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
  rating: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  fee: {
    type: DataTypes.FLOAT(10),
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
