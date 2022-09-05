import asyncHandler from "express-async-handler";
import Employe from "../models/CSRModel.js";

const employePost = asyncHandler(async (req, res) => {
  const { name, phone, address, cnic,password,roll } = req.body;

  const employeData = await Employe.create({
    name,
    phone,
    address,
    cnic,
    password,
    roll,
  });

  if (employeData) {
    res.status(201).json({
      name: employeData.name,
      phone: employeData.phone,
      address: employeData.address,
      cnic: employeData.cnic,
      password: employeData.password,
      roll: employeData.roll,
    });
  } else {
    res.status(400);
    throw new Error("Contact not Saved");
  }
});

const getEmployeByRoll = asyncHandler(async (req, res) => {
    const { roll } = req.body;
  
    const employeData = await Employe.findOne({roll})
  
    if (employeData) {
      res.status(201).json({
        employeData
      });
    } else {
      res.status(400);
      throw new Error(" not Employe");
    }
  });
  

export {employePost ,getEmployeByRoll};
