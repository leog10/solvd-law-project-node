import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Assigned_Case = sequelize.define('assigned_cases', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
