import { Sequelize } from "sequelize-typescript";
import Guest from "../models/guest";
import Local from "../models/local";
import localSport from "../models/localsports";
import Partida from "../models/match";
import Sport from "../models/sport";
import User from "../models/user";
import userSport from "../models/userssports";

// eslint-disable-next-line
const dbConfig = require("../config/database");
// import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

const models = [
  User,
  userSport,
  Sport,
  Local,
  localSport,
  Partida,
  Guest,
];

sequelize.addModels(models);

export default sequelize;
