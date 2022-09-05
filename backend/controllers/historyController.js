import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import History from "../models/historyModel.js";
import Agent from "../models/agentModel.js";
import Bank from "../models/bankModel.js";

const historyPost = asyncHandler(async (req, res) => {
  const { amount, receiverNumber, senderNumber, senderName, receiverName } =
    req.body;
  const receiveUser = await User.findOne({ phone: receiverNumber });
  if (receiveUser) {
    receiveUser.amount = Number(receiveUser.amount) + Number(amount);
  }
  const updatedUser1 = await receiveUser.save();

  const senderUser = await User.findOne({ phone: senderNumber });
  if (senderUser) {
    senderUser.amount = senderUser.amount - Number(amount);
  }
  const updatedUser2 = await senderUser.save();

  const historyData = await History.create({
    receiverName,
    senderName,
    amount,
    receiverNumber,
    senderNumber,
  });

  if (historyData) {
    res.status(201).json({
      receverName: historyData.receverName,
      senderName: historyData.senderName,
      amount: historyData.amount,
      receverPhone: historyData.receverPhone,
      senderPhone: historyData.senderPhone,
    });
  } else {
    res.status(400);
    throw new Error("History not Saved");
  }
});

const agentMoneySend = asyncHandler(async (req, res) => {
  const { amount, receiverNumber, senderNumber, senderName, receiverName } =
    req.body;

  const agentTransfer = await User.findOne({ phone: receiverNumber });
  if (agentTransfer) {
    agentTransfer.amount = Number(agentTransfer.amount) + Number(amount);
  }
  const updatedAgent = await agentTransfer.save();

  const agentSender = await Agent.findOne({ phone: senderNumber });
  if (agentSender) {
    agentSender.amount = agentSender.amount - Number(amount);
  }

  const updatedAgentSender = await agentSender.save();

  const historyData = await History.create({
    receiverName,
    senderName,
    amount,
    receiverNumber,
    senderNumber,
  });

  if (historyData) {
    res.status(201).json({
      receverName: historyData.receverName,
      senderName: historyData.senderName,
      amount: historyData.amount,
      receverPhone: historyData.receverPhone,
      senderPhone: historyData.senderPhone,
    });
  } else {
    res.status(400);
    throw new Error("History not Saved");
  }
});

const moneyToAgent = asyncHandler(async (req, res) => {
  const { amount, receiverNumber } = req.body;

  const agentTransfer = await Agent.findOne({ phone: receiverNumber });
  if (agentTransfer) {
    agentTransfer.amount = Number(agentTransfer.amount) + Number(amount);
  }
  const updatedAgent = await agentTransfer.save();

  res.status(200).json(updatedAgent);
});

const moneyToBank = asyncHandler(async (req, res) => {
  const { amount, receiverNumber, senderNumber,senderName ,receiverName} = req.body;

  const agentTransfer = await Bank.findOne({ number: receiverNumber });
  if (agentTransfer) {
    agentTransfer.amount = Number(agentTransfer.amount) + Number(amount);
  }
  const updatedAgent = await agentTransfer.save();

  const senderUser = await User.findOne({ phone: senderNumber });
  if (senderUser) {
    senderUser.amount = senderUser.amount - Number(amount);
  }
  const updatedUser2 = await senderUser.save();

  const historyData = await History.create({
    amount,
    receiverNumber,
    receiverName,
    senderNumber,
    senderName
  });

  res.status(200).json(historyData);
});

const gethistorybyName = asyncHandler(async (req, res) => {
  const { receverName, senderName, receverPhone, senderPhone } = req.body;
  if (receverName) {
    const histry = await Employe.findOne({ receverName });
    if (histry) {
      res.status(201).json({
        employeData,
      });
    } else {
      res.status(400);
      throw new Error(" not Employe");
    }
  } else if (senderName) {
    const histry = await Employe.findOne({ senderName });
    if (histry) {
      res.status(201).json({
        employeData,
      });
    } else {
      res.status(400);
      throw new Error(" not Employe");
    }
  } else if (receverPhone) {
    const histry = await Employe.findOne({ receverPhone });
    if (histry) {
      res.status(201).json({
        employeData,
      });
    } else {
      res.status(400);
      throw new Error(" not Employe");
    }
  } else if (senderPhone) {
    const histry = await Employe.findOne({ receverPhone });
    if (histry) {
      res.status(201).json({
        employeData,
      });
    } else {
      res.status(400);
      throw new Error(" not Employe");
    }
  }
});

const getAllHistory = asyncHandler(async (req, res) => {
  const history = await History.find();
  res.json(history);
});

export {
  historyPost,
  gethistorybyName,
  getAllHistory,
  agentMoneySend,
  moneyToAgent,
  moneyToBank,
};
