import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Accountant from "../models/accountantModel.js";
//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authAccountant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Accountant.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      frontCNIC: user.frontCNIC,
      backCNIC: user.backCNIC,
      pic: user.pic,
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
const registerAccountant = asyncHandler(async (req, res) => {
  const { name, email, password, backCNIC, frontCNIC, pic } = req.body;

  const userExists = await Accountant.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("Accountant already exists");
  }

  const user = await Accountant.create({
    name,
    email,
    password,
    backCNIC,
    frontCNIC,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      frontCNIC: user.frontCNIC,
      backCNIC: user.backCNIC,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Accountant not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateAccountantProfile = asyncHandler(async (req, res) => {
  const user = await Accountant.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Accountant Not Found");
  }
});

const DeleteAccountant = asyncHandler(async (req, res) => {
  const reqeust = await Accountant.findById(req.params.id);

  if (reqeust) {
    await reqeust.remove();
    res.json({ message: "Removed" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

const getAllAccountant = asyncHandler(async (req, res) => {
  const users = await Accountant.find();
  res.json(users);
});

const getAccountantById = asyncHandler(async (req, res) => {
  const accountant = await Accountant.findById(req.params.id);

  if (accountant) {
    res.json(accountant);
  } else {
    res.status(404).json({ message: "Accountant not found" });
  }
  res.json(accountant);
});
export {
  authAccountant,
  updateAccountantProfile,
  registerAccountant,
  getAllAccountant,
  DeleteAccountant,
  getAccountantById
};
