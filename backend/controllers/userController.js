import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      cnic: user.cnic,
      pic: user.pic,
      amount: user.amount,
      frontCNIC: user.frontCNIC,
      backCNIC: user.backCNIC,
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
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    pic,
    phone,
    address,
    cnic,
    postalCode,
    city,
    backCNIC,
    frontCNIC,
    amount,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    phone,
    address,
    cnic,
    postalCode,
    city,
    backCNIC,
    frontCNIC,
    amount,
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
      postalCode: user.postalCode,
      isAdmin: user.isAdmin,
      frontCNIC: user.frontCNIC,
      backCNIC: user.backCNIC,
      pic: user.pic,
      amount: user.amount,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.cnic = req.body.cnic || user.cnic;
    user.city = req.body.city || user.city;
    user.amount = req.body.amount || user.amount;
    user.postalCode = req.body.postalCode || user.postalCode;
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
      postalCode: updatedUser.postalCode,
      isAdmin: updatedUser.isAdmin,
      amount: updatedUser.amount,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const DeleteUser = asyncHandler(async (req, res) => {
  const reqeust = await User.findById(req.params.id);

  if (reqeust) {
    await reqeust.remove();
    res.json({ message: "Removed" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(user);
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export {
  authUser,
  updateUserProfile,
  registerUser,
  getAllUser,
  DeleteUser,
  getUserById,
};
