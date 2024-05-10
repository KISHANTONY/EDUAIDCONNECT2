import express from "express";
import {
  deleteJob,
  getAllReqs,
  getMyReqs,
  getSingleJob,
  Postreq,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllReqs);
router.post("/post", isAuthenticated, Postreq);
router.get("/getmyReqs", isAuthenticated, getMyReqs);
router.put("/update/:id", isAuthenticated, updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.get("/:id", isAuthenticated, getSingleJob);

export default router;
