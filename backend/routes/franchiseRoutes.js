import express from "express";
import {
  authFranchise,
  DeleteFranchise,
  getAllFranchise,
  getFranchiseById,
  registerFranchise,
  updateFranchiseProfile,
} from "../controllers/franchiseController.js";
import { protect } from "../middleware/franchiseMiddleware.js";
const router = express.Router();

router.route("/franchiseRegister").post(registerFranchise);
router.post("/franchiseLogin", authFranchise);
router.route("/franchiseProfile").post(protect, updateFranchiseProfile);
router.route("/getAllFranchise").get(getAllFranchise);
router.route("/:id").delete(DeleteFranchise);
router.route("/:id").get(getFranchiseById);
export default router;
