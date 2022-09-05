import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import AccountHandler from "../models/AccountHandlerModel.js";
//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authAccountHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await AccountHandler.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
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
const registerAccountHandler = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await AccountHandler.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("AccountHandler already exists");
  }

  const user = await AccountHandler.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("AccountHandler not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateAccountHandler = asyncHandler(async (req, res) => {
  const user = await AccountHandler.findById(req.user._id);

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
    throw new Error("AccountHandler Not Found");
  }
});

const getAllAccountHandler = asyncHandler(async (req, res) => {
  const users = await AccountHandler.find();
  res.json(users);
});

const getHandlerById = asyncHandler(async (req, res) => {
  const user = await AccountHandler.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Account Handler not found" });
  }

  res.json(user);
});

const DeleteAccountHandler = asyncHandler(async (req, res) => {
  const reqeust = await AccountHandler.findById(req.params.id);

  if (reqeust) {
    await reqeust.remove();
    res.json({ message: "Removed" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

export {
  authAccountHandler,
  registerAccountHandler,
  getHandlerById,
  DeleteAccountHandler,
  getAllAccountHandler,
  updateAccountHandler,
};
