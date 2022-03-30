import express from 'express';
import * as matchController from '../controllers/matchController';
const matchRoutes = express();

matchRoutes.get("/match", matchController.index);

export default matchRoutes;