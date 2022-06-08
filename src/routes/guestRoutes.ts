import express from "express";
import { isAuth } from "../controllers/authController";
import {
  create, remove,
} from "../controllers/guestController";

const guestRoutes = express();

guestRoutes.post("/guest", isAuth, create);
guestRoutes.delete("/guest/:guestId", isAuth, remove);

export default guestRoutes;
