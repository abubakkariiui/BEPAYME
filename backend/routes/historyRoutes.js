import express from "express";
import { historyPost,gethistorybyName, getAllHistory, agentMoneySend, moneyToAgent, moneyToBank, } from "../controllers/historyController.js";
const router = express.Router();

router.route("/create").post(historyPost);
router.route("/").get(getAllHistory);
router.route('/getHistory').post(gethistorybyName);
router.route("/sendMoney").post(agentMoneySend);
router.route("/moneyFranchise").post(moneyToAgent);
router.route("/moneyBank").post(moneyToBank);

export default router;