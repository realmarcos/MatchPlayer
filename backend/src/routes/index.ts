import express, { Request, Response } from 'express';
import authRoutes from './authRoutes';
import localRoutes from './localRoutes';
import matchRoutes from './matchRoutes';
import userRoutes from './userRoutes';

const routes = express();


routes.use(userRoutes);
routes.use(matchRoutes);
routes.use(localRoutes);
routes.use(authRoutes);

routes.use('/', (req: Request, res: Response, next) => {
  res.status(404).json({ error: "page not found" });
});
export default routes;