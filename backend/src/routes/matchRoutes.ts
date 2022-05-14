import express from "express";
import { isAuth } from "../controllers/authController";
import {
  index, create, update, remove, show,
} from "../controllers/matchController";

const matchRoutes = express();

matchRoutes.get("/match/:matchId", isAuth, show);
matchRoutes.get("/match", isAuth, index);
matchRoutes.post("/match", isAuth, create);
matchRoutes.delete("/match/:matchId", isAuth, remove);
matchRoutes.put("/match/:matchId", isAuth, update);

export default matchRoutes;
