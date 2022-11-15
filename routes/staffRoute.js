import { Router } from 'express';
import {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffWithFilters,
} from '../controllers/staffController.js';

const staffRoute = Router();

staffRoute.get('/filter', getStaffWithFilters);
staffRoute.get('/', getStaff);
staffRoute.get('/:id', getStaffById);
staffRoute.post('/', createStaff);
staffRoute.put('/:id', updateStaff);
staffRoute.delete('/:id', deleteStaff);

export default staffRoute;
