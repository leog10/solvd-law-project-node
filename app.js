import express from 'express';
import assignedCase from './routes/assignedCase.js';
import caseRoute from './routes/caseRoute.js';
import clientRoute from './routes/clientRoute.js';
import staffRoute from './routes/staffRoute.js';

const app = express();
app.use(express.json());

app.use('/client', clientRoute);
app.use('/staff', staffRoute);
app.use('/case', caseRoute);
app.use('/assigned', assignedCase);

export default app;
