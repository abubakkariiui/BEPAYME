import express from "express";
import {
  authAdmin,
  registerAdmin,
  updateAdminProfile,
} from "../controllers/adminController.js";
import { protect } from "../middleware/adminMiddleware.js";
const router = express.Router();

router.route("/adminRegister").post(registerAdmin);
router.post("/adminLogin", authAdmin);
router.route("/adminProfile").post(protect, updateAdminProfile);

export default router;
