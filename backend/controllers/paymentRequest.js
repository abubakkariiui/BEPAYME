import asyncHandler from "express-async-handler";
import Pay from "../models/paymentRequest.js";
const PayRequest = asyncHandler(async (req, res) => {
  const { name, usernumber, amount, agentNumber } = req.body;
  const payData = await Pay.create({
    name,
    usernumber,
    amount,
    agentNumber,
  });
  if (payData) {
    res.status(201).json({
      _id: payData._id,
      name: payData.name,
      usernumber: payData.usernumber,
      amount: payData.amount,
      agentNumber: payData.agentNumber,
    });
  } else {
    res.status(400);
    throw new Error("payData not Saved");
  }
});

const DeleteReqeust = asyncHandler(async (req, res) => {
  const reqeust = await Pay.findById(req.params.id);

  if (reqeust) {
    await reqeust.remove();
    res.json({ message: "Removed" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

const getRequest = asyncHandler(async (req, res) => {
  const history = await Pay.find();
  res.json(history);
});

export { PayRequest, getRequest, DeleteReqeust };
