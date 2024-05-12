import express from "express";
import {
  deleterequest,
  getAllReqs,
  getMyReqs,
  getSinglerequest,
  Postreq,
  updaterequest,
} from "../controllers/reqController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllReqs);
router.post("/post", isAuthenticated, Postreq);
router.get("/getmyReqs", isAuthenticated, getMyReqs);
router.put("/update/:id", isAuthenticated, updaterequest);
router.delete("/delete/:id", isAuthenticated, deleterequest);
router.get("/:id", isAuthenticated, getSinglerequest);

export default router;
