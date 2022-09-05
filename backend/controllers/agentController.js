import asyncHandler from "express-async-handler";
import Agent from "../models/agentModel.js";
import Pay from "../models/paymentRequest.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authAgent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Agent.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      cnic: user.cnic,
      pranchiseName: user.pranchiseName,
      frontCNIC: user.frontCNIC,
      backCNIC: user.backCNIC,
      pic: user.pic,
      amount: user.amount,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerAgent = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    backCNIC,
    frontCNIC,
    pic,
    phone,
    address,
    cnic,
    postalCode,
    city,
    amount,
    pranchiseName,
  } = req.body;

  const userExists = await Agent.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("Agent already exists");
  }

  const user = await Agent.create({
    name,
    email,
    password,
    backCNIC,
    frontCNIC,
    pic,
    phone,
    address,
    cnic,
    amount,
    postalCode,
    city,
    pranchiseName,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      cnic: user.cnic,
      city: user.city,
      amount: user.amount,
      postalCode: user.postalCode,
      frontCNIC: user.frontCNIC,
      backCNIC: user.backCNIC,
      pic: user.pic,
      pranchiseName: user.pranchiseName,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Agent not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateAgentProfile = asyncHandler(async (req, res) => {
  const user = await Agent.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.cnic = req.body.cnic || user.cnic;
    user.city = req.body.city || user.city;
    user.pranchiseName = req.body.pranchiseName || user.pranchiseName;
    (user.amount = req.body.amount || user.amount),
      (user.postalCode = req.body.postalCode || user.postalCode);
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      phone: updatedUser.phone,
      address: updatedUser.address,
      cnic: updatedUser.cnic,
      city: updatedUser.city,
      amount: updatedUser.amount,
      postalCode: updatedUser.postalCode,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const getAllAgent = asyncHandler(async (req, res) => {
  const test = await Agent.find();
  res.json(test);
});

const getRequest = asyncHandler(async (req, res) => {
  const test = await Pay.find();
  res.json(test);
});

const DeleteAgent = asyncHandler(async (req, res) => {
  const reqeust = await Agent.findById(req.params.id);

  if (reqeust) {
    await reqeust.remove();
    res.json({ message: "Removed" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

const getAgentById = asyncHandler(async (req, res) => {
  const accountant = await Agent.findById(req.params.id);

  if (accountant) {
    res.json(accountant);
  } else {
    res.status(404).json({ message: "Agent not found" });
  }
  res.json(accountant);
});

export {
  authAgent,
  updateAgentProfile,
  registerAgent,
  getRequest,
  getAllAgent,
  DeleteAgent,
  getAgentById,
};
