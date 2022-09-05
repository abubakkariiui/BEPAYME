import express from "express";
const router = express.Router();
import { csrPost, getCSR } from "../controllers/csr.js";
router.route("/create").post(csrPost);
router.route("/").get(getCSR);

export default router;
