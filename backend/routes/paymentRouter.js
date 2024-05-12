import express from "express";
import {
  StudentGetAllApplications,
  ReqseekerDeleteApplication,
  ReqseekerGetAllApplications,
  postApplication,
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/Student/getall", isAuthenticated, StudentGetAllApplications);
router.get("/Reqseeker/getall", isAuthenticated, ReqseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, ReqseekerDeleteApplication);

export default router;
