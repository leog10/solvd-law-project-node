import { Client } from './Client.js';
import { Staff } from './Staff.js';
import { Case } from './Case.js';
import { Assigned_Case } from './Assigned_Case.js';

Staff.belongsTo(Case, {
  foreignKey: { name: 'caseId', allowNull: false },
  onDelete: 'CASCADE',
});
Case.hasMany(Staff, { onDelete: 'CASCADE' });

Staff.hasOne(Assigned_Case);
Assigned_Case.belongsTo(Staff, {
  foreignKey: { name: 'staffId', allowNull: false },
});

Client.hasOne(Assigned_Case);
Assigned_Case.belongsTo(Client, {
  foreignKey: { name: 'clientId', allowNull: false },
});

export { Client, Staff, Case, Assigned_Case };
