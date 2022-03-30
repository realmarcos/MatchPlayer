import express from 'express'
import * as userController from '../controllers/userController'
const userRoutes = express();

userRoutes.get("/user", userController.index);

export default userRoutes;