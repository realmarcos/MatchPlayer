import express from 'express';
import * as localController from '../controllers/localController';
const localRoutes = express();

localRoutes.get("/local", localController.index);

export default localRoutes;