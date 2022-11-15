import express from 'express';
import { Staff } from '../models/Staff.js';
import { Op } from 'sequelize';
import { Case } from '../models/Case.js';

const app = express();

export const getStaffWithFilters = async (req, res) => {
  const fee = req.query.fee;
  const caseName = req.query.caseName;
  const available = req.query.available ?? true;

  if (!fee) {
    return res.status(400).json('You need to provide a fee query');
  }

  if (!caseName) {
    return res.status(400).json('You need to provide a caseName query');
  }

  try {
    const staff = await Staff.findAll({
      where: {
        fee: {
          [Op.lte]: fee,
        },
        available,
      },
      include: {
        model: Case,
        where: {
          name: caseName,
        },
      },
      order: [['rating', 'DESC']],
    });
    res.status(200).json(staff);
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll({
      include: Case,
      order: [['rating', 'DESC']],
    });
    res.status(200).json(staff);
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const getStaffById = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findByPk(id, { include: Case });
    if (staff) return res.status(200).json(staff);
    res.status(404).json('Staff member not found');
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const createStaff = async (req, res) => {
  const { firstName, lastName, rating, fee, available, caseId } = req.body;

  try {
    const staff = await Staff.create({
      firstName,
      lastName,
      rating,
      fee,
      available,
      caseId: caseId,
    });
    res.status(201).json({ msg: 'staff member created', staff });
  } catch (error) {
    console.log(error.message);
    res.status(400).json('Something went wrong...');
  }
};

export const updateStaff = async (req, res) => {
  const { id } = req.params;
  const staff = req.body;

  try {
    const updatedStaff = await Staff.update(staff, {
      where: {
        id,
      },
    });

    res.status(200).json({ msg: `updated staff with id: ${id}`, updatedStaff });
  } catch (error) {
    console.log(error.message);
    res.status(400).json('Something went wrong...');
  }
};

export const deleteStaff = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.destroy({
      where: {
        id,
      },
    });

    if (staff) {
      return res.status(200).json(`deleted staff with id: ${id}`);
    }
    res.status(404).json(`staff with id: ${id} not found`);
  } catch (error) {
    res.status(400).json('Something went wrong...');
    console.log(error);
  }
};
