import express from "express";
import {
  StudentGetAllPayments,
  ReqseekerDeletePayment,
  ReqseekerGetAllPayments,
  postPayment,
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postPayment);
router.get("/Student/getall", isAuthenticated, StudentGetAllPayments);
router.get("/Reqseeker/getall", isAuthenticated, ReqseekerGetAllPayments);
router.delete("/delete/:id", isAuthenticated, ReqseekerDeletePayment);

export default router;
