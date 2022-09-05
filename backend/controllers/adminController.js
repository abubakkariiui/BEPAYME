import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
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
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await Admin.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("Admin already exists");
  }

  const user = await Admin.create({
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
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Admin not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateAdminProfile = asyncHandler(async (req, res) => {
  const user = await Admin.findById(req.user._id);

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
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Admin Not Found");
  }
});

export { authAdmin, updateAdminProfile, registerAdmin };
