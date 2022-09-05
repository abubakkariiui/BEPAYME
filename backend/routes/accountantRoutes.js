import express from "express";
import {
  authAccountant,
  DeleteAccountant,
  getAccountantById,
  getAllAccountant,
  registerAccountant,
  updateAccountantProfile,
} from "../controllers/accountantController.js";
import { getUserById } from "../controllers/userController.js";
import { protect } from "../middleware/accountantMiddleware.js";
const router = express.Router();

router.route("/accountantRegister").post(registerAccountant);
router.post("/accountantLogin", authAccountant);
router.route("/accountantProfile").post(protect, updateAccountantProfile);
router.route("/getAllAccountant").get(getAllAccountant);
router.route("/:id").delete(DeleteAccountant);
router.route("/:id").get(getAccountantById);

export default router;
