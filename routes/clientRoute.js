import { Router } from 'express';
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
} from '../controllers/clientController.js';

const clientRoute = Router();

clientRoute.get('/', getClients);
clientRoute.get('/:id', getClientById);
clientRoute.post('/', createClient);
clientRoute.put('/:id', updateClient);
clientRoute.delete('/:id', deleteClient);

export default clientRoute;
