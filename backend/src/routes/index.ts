import express from 'express';
import localRoutes from './localRoutes';
import matchRoutes from './matchRoutes';
import userRoutes from './userRoutes';

const routes = express();

routes.use(userRoutes);
routes.use(matchRoutes);
routes.use(localRoutes);

export default routes;