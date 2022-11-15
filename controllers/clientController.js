import express from 'express';
import { Client } from '../models/Client.js';

const app = express();

export const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByPk(id);
    if (client) return res.status(200).json(client);
    res.status(404).json('Client not found');
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const createClient = async (req, res) => {
  const { firstName, lastName, budget } = req.body;

  try {
    const client = await Client.create({ firstName, lastName, budget });
    res.status(201).json({ msg: 'client created', client });
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const client = req.body;

  try {
    const updatedClient = await Client.update(client, {
      where: {
        id,
      },
    });

    res
      .status(200)
      .json({ msg: `updated client with id: ${id}`, updatedClient });
  } catch (error) {
    console.log(error.message);
    res.status(400).json('Something went wrong...');
  }
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.destroy({
      where: {
        id,
      },
    });

    if (client) {
      return res.status(200).json(`deleted client with id: ${id}`);
    }
    res.status(404).json(`client with id: ${id} not found`);
  } catch (error) {
    res.status(400).json('Something went wrong...');
    console.log(error);
  }
};
