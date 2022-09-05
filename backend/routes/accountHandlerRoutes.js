import express from "express";
import { authAccountHandler, DeleteAccountHandler, getAllAccountHandler, getHandlerById, registerAccountHandler, updateAccountHandler } from "../controllers/accountHandlerController.js";
import { protect } from '../middleware/handlerMiddleware.js'
const router = express.Router();
router.route("/handlerRegister").post(registerAccountHandler);
router.post("/handlerLogin", authAccountHandler);
router.route("/handlerProfile").post(protect, updateAccountHandler);
router.route("/getAllHandler").get(getAllAccountHandler);
router.route("/:id").delete(DeleteAccountHandler);
router.route("/:id").get(getHandlerById);
export default router;
