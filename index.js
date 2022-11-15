import app from './app.js';
import { sequelize } from './database/database.js';
import { Case, Client, Staff, Assigned_Case } from './models/models.js';

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    // await sequelize.sync();

    // drop table if it already exists
    // sequelize.sync({ force: true }).then(() => {
    //   console.log('Drop and re-sync db.');
    // });

    await sequelize.authenticate();
    console.log('Database Connection established successfully.');
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
