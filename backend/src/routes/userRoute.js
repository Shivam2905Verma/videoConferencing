import express from "express";
import {
  addHistory,
  getUserHistory,
  login,
  register,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/add_to_activity", addHistory);
router.get("/get_all_activity", getUserHistory);

export default router;
