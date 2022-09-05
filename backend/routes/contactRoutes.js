import express from "express";
import {contactPost, getContacts} from "../controllers/contactController.js";
const router = express.Router();

router.route("/create").post(contactPost);
router.route("/").get(getContacts);

export default router;