import { Sequelize } from "sequelize-typescript";
import User from "../models/user";

// eslint-disable-next-line
const dbConfig = require("../config/database");
// import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

const models = [
  User,
];

sequelize.addModels(models);

export default sequelize;