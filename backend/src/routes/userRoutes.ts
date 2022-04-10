import express from "express";
import { isAuth } from "../controllers/authController";
import * as userController from "../controllers/userController";

const userRoutes = express();

userRoutes.get("/user", isAuth, userController.index);

export default userRoutes;
