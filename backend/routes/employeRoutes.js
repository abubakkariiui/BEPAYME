import express from "express";
import {contactPost} from "../controllers/contactController.js";
import { employePost,getEmployeByRoll } from "../controllers/employe.Controller.js";
const router = express.Router();

router.route("/").post(employePost);
router.route('/getRoll').post(getEmployeByRoll);

export default router;