import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import CSRR from "../models/CSRRModel.js";
//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authCSR = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await CSRR.findOne({ email });

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
const registerCSR = asyncHandler(async (req, res) => {
  const { name, email, password, backCNIC, frontCNIC, pic } = req.body;

  const userExists = await CSRR.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("CSRR already exists");
  }

  const user = await CSRR.create({
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
    throw new Error("CSRR not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateCSRProfile = asyncHandler(async (req, res) => {
  const user = await CSRR.findById(req.user._id);

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
    throw new Error("CSRR Not Found");
  }
});

const DeleteCSR = asyncHandler(async (req, res) => {
  const reqeust = await CSRR.findById(req.params.id);

  if (reqeust) {
    await reqeust.remove();
    res.json({ message: "Removed" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

const getAllCSR = asyncHandler(async (req, res) => {
  const users = await CSRR.find();
  res.json(users);
});

const getCsrById = asyncHandler(async (req, res) => {
  const csr = await CSRR.findById(req.params.id);

  if (csr) {
    res.json(csr);
  } else {
    res.status(404).json({ message: "csr not found" });
  }

  res.json(csr);
});

export {
  authCSR,
  updateCSRProfile,
  registerCSR,
  DeleteCSR,
  getAllCSR,
  getCsrById,
};
