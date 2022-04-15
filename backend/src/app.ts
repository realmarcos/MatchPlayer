import express, { Request, Response, NextFunction } from "express";
import * as Sentry from "@sentry/node";
import AppError from "./errors";
import routes from "./routes";
import logger from "./utils/logger";

Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(routes);

app.use(async (err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn(err);
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

export default app;
