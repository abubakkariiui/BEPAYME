import express from "express";
const router = express.Router();
import { bankPost } from '../controllers/bankController.js'
router.route("/create").post(bankPost);

export default router;
