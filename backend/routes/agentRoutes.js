import express from "express";
import {
  authAgent,
  DeleteAgent,
  getAgentById,
  getAllAgent,
  getRequest,
  registerAgent,
  updateAgentProfile } from "../controllers/agentController.js"

import { agentProtect } from "../middleware/agentMiddleware.js";
const router = express.Router();

router.route("/agentRegister").post(registerAgent);
router.post("/loginAgent", authAgent);
router.route("/agentProfile").post(agentProtect, updateAgentProfile);
router.route("/").get(getRequest);
router.route("/getAllAgent").get(getAllAgent);
router.route("/:id").delete(DeleteAgent);
router.route("/:id").get(getAgentById);

export default router;
