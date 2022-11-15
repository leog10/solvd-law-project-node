import { Router } from 'express';
import {
  createAssignedCase,
  deleteAssignedCase,
  getAssignedCase,
  getAssignedCaseById,
  updateAssignedCase,
} from '../controllers/assignedCase.js';

const assignedCase = Router();

assignedCase.get('/', getAssignedCase);
assignedCase.get('/:id', getAssignedCaseById);
assignedCase.post('/', createAssignedCase);
assignedCase.put('/:id', updateAssignedCase);
assignedCase.delete('/:id', deleteAssignedCase);

export default assignedCase;
