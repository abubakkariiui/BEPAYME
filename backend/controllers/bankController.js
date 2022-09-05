import asyncHandler from "express-async-handler";
import Bank from "../models/bankModel.js";
const bankPost = asyncHandler(async (req, res) => {
  const { name, number } = req.body;

  const bankData = await Bank.create({
    name,
    number,
  });

  if (bankData) {
    res.status(201).json({
      _id: bankData._id,
      name: bankData.name,
      number: bankData.number,
    });
  } else {
    res.status(400);
    throw new Error("Bank not Saved");
  }
});

export { bankPost };
