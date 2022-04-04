import "./bootstrap";
import app from "./app";
import logger from "./utils/logger";
import sequelize from "./database";

app.listen(process.env.PORT, () => {
  sequelize.sync();
  logger.info(`Server started on port: ${process.env.PORT}`);
});
