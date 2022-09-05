import express from "express";
import {
  DeleteReqeust,
  getRequest,
  PayRequest,
} from "../controllers/paymentRequest.js";

const router = express.Router();
router.route("/create").post(PayRequest);
router.route("/getRequest").get(getRequest);
router.route("/:id").delete(DeleteReqeust);
export default router;
