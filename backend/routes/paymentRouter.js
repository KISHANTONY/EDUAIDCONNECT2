import express from "express";
import {
  StudentGetAllPayments,
  SponsorDeletePayment,
  SponsorGetAllPayments,
  postPayment,
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postPayment);
router.get("/Student/getall", isAuthenticated, StudentGetAllPayments);
router.get("/Sponsor/getall", isAuthenticated, SponsorGetAllPayments);
router.delete("/delete/:id", isAuthenticated, SponsorDeletePayment);

export default router;
