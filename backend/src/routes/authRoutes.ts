import express from "express";
import * as authController from "../controllers/authController";

const authRoutes = express();

authRoutes.post("/sigin", authController.sigin);
authRoutes.post("/signup", authController.signup);
authRoutes.get("/sigin", authController.isAuth);

export default authRoutes;
