import express from 'express';
import { Assigned_Case } from '../models/Assigned_Case.js';
import { Case } from '../models/Case.js';
import { Client } from '../models/Client.js';
import { Staff } from '../models/Staff.js';

const app = express();

export const getAssignedCase = async (req, res) => {
  try {
    const assignedCases = await Assigned_Case.findAll({
      include: [
        {
          model: Staff,
          include: {
            model: Case,
          },
        },
        {
          model: Client,
        },
      ],
    });
    res.status(200).json(assignedCases);
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const getAssignedCaseById = async (req, res) => {
  const { id } = req.params;

  try {
    const assignedCase = await Assigned_Case.findByPk(id, {
      include: [
        {
          model: Staff,
          include: {
            model: Case,
          },
        },
        {
          model: Client,
        },
      ],
    });
    if (assignedCase) return res.status(200).json(assignedCase);
    res.status(404).json('Assigned case not found');
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const createAssignedCase = async (req, res) => {
  const { clientId, staffId } = req.body;

  try {
    const existingCase = await Assigned_Case.findOne({
      include: [
        {
          model: Staff,
          where: {
            id: staffId,
          },
        },
        {
          model: Client,
          where: {
            id: clientId,
          },
        },
      ],
    });

    if (existingCase) {
      return res.json('Staff member already assigend to the client case');
    }

    const client = await Client.findByPk(clientId);
    const staff = await Staff.findByPk(staffId);

    if (!client) {
      return res.status(400).json('You need to provide a valid client id');
    }

    if (!staff) {
      return res.status(400).json('You need to provide a valid staff id');
    }

    if (client.budget < staff.fee) {
      return res
        .status(400)
        .json('The staff fee is too high for the client budget');
    }

    if (!staff.available) {
      return res.status(400).json('Staff member unavailable');
    }

    const assignedCase = await Assigned_Case.create({ clientId, staffId });

    // Update staff member available to false;
    await Staff.update(
      { available: false },
      {
        where: {
          id: staffId,
        },
      }
    );

    res.status(201).json({ msg: 'Case Assigned', assignedCase });
  } catch (error) {
    console.log(error);
    res.status(400).json('Something went wrong...');
  }
};

export const updateAssignedCase = (req, res) => {
  // not implemented
  const { id } = req.params;
  const client = req.body;
  res.json({ msg: 'update Assigned Case with id: ' + id, client });
};

export const deleteAssignedCase = async (req, res) => {
  const { id } = req.params;

  try {
    const assignedCase = await Assigned_Case.destroy({
      where: {
        id,
      },
    });

    if (assignedCase) {
      return res.status(200).json(`deleted Assigned Case with id: ${id}`);
    }
    res.status(404).json(`Assigned Case with id: ${id} not found`);
  } catch (error) {
    res.status(400).json('Something went wrong...');
    console.log(error);
  }
};
