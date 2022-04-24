import express from "express";
import { isAuth } from "../controllers/authController";
import {
  create, index, show, remove,
} from "../controllers/localController";

const localRoutes = express();

localRoutes.get("/local/:localId", isAuth, show);
localRoutes.get("/local", isAuth, index);
localRoutes.post("/local", isAuth, create);
localRoutes.delete("/local/:localId", isAuth, remove);

export default localRoutes;
