import express from 'express';
import { Case } from '../models/Case.js';
import { Staff } from '../models/Staff.js';

const app = express();

export const getCase = async (req, res) => {
  try {
    const cases = await Case.findAll({ include: Staff });
    res.status(200).json(cases);
  } catch (error) {
    console.log(error.message);
    res.status(400).json('Something went wrong...');
  }
};

export const getCaseById = async (req, res) => {
  const { id } = req.params;

  try {
    const singleCase = await Case.findByPk(id, { include: Staff });
    if (singleCase) return res.status(200).json(singleCase);
    res.status(404).json('Case not found');
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const createCase = async (req, res) => {
  const { name } = req.body;

  try {
    const newCase = await Case.create({ name });
    res.status(201).json({ msg: 'Case created', newCase });
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const updateCase = async (req, res) => {
  const { id } = req.params;
  const caseData = req.body;

  try {
    const updatedCase = await Case.update(caseData, {
      where: {
        id,
      },
    });

    res.status(200).json({ msg: 'updated case with id: ' + id, updatedCase });
  } catch (error) {
    console.log(error.message);
    res.status(400).json('Something went wrong...');
  }
};

export const deleteCase = async (req, res) => {
  const { id } = req.params;

  try {
    const caseDeleted = await Case.destroy({
      where: {
        id,
      },
    });

    if (caseDeleted) {
      return res.status(200).json(`deleted case with id: ${id}`);
    }
    res.status(404).json(`case with id: ${id} not found`);
  } catch (error) {
    res.status(400).json('Something went wrong...');
    console.log(error);
  }
};
