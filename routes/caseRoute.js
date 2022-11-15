import { Router } from 'express';
import {
  createCase,
  deleteCase,
  getCase,
  getCaseById,
  updateCase,
} from '../controllers/caseController.js';

const caseRoute = Router();

caseRoute.get('/', getCase);
caseRoute.get('/:id', getCaseById);
caseRoute.post('/', createCase);
caseRoute.put('/:id', updateCase);
caseRoute.delete('/:id', deleteCase);

export default caseRoute;
