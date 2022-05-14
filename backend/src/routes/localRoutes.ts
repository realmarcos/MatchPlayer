import express from "express";
import { isAuth } from "../controllers/authController";
import {
  create, index, show, remove, update,
} from "../controllers/localController";

const localRoutes = express();

localRoutes.get("/local/:localId", show);
localRoutes.get("/local", isAuth, index);
localRoutes.post("/local", isAuth, create);
localRoutes.delete("/local/:localId", isAuth, remove);
localRoutes.put("/local/:localId", isAuth, update);

export default localRoutes;
