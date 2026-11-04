import express from "express";
import { registerController } from  "../controllers/authController.js";
import { authToken } from "../middleware/authMiddleware.js";
import {profileController} from"../controllers/profileController.js";

const router = express.Router();

router.post( "/register", registerController);

router.get("/profile", authToken, profileController);

router.get("/admin/users",authToken,roleMiddleware,adminController);

export default router;