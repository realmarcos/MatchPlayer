import express from "express";
import { isAuth } from "../controllers/authController";
import * as userController from "../controllers/userController";

const userRoutes = express();

userRoutes.get("/user", isAuth, userController.index);
userRoutes.get("/user/:userId", isAuth, userController.show);
userRoutes.post("/user/:userId", isAuth, userController.update);

export default userRoutes;
