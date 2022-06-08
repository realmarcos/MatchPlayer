import { Request, Response } from "express";
import { Op } from "sequelize";
import Partida from "../models/match";
import Sport from "../models/sport";
import Local from "../models/local";
import User from "../models/user";
import Guest from "../models/guest";

const index = async (req: Request, res: Response) => {
  const { search, userIdCreated } = req.query;
  let whereCond;
  if (userIdCreated) {
    const guests = await Guest.findAll({ where: { userId: +userIdCreated } });
    const getMacthId = (guest: any) => [guest.matchId].join("");
    const newWhere = {
      [Op.or]: [
        { name: { [Op.substring]: search } },
        { note: { [Op.substring]: search } },
      ],
      userIdCreated,
      // [Op.or]: [
      //   guests ? { id: guests.map(getMacthId) } : undefined,
      //   { userIdCreated },
      // ],

    };
    whereCond = newWhere;
  } else {
    const newWhere = {
      [Op.or]: [
        { name: { [Op.substring]: search } },
        { note: { [Op.substring]: search } },
      ],
    };
    whereCond = newWhere;
  }

  const { count, rows: matchs } = await Partida.findAndCountAll({
    where: whereCond,
    order: [["createdAt", "DESC"]],
    include: [
      { model: Sport, as: "sport", attributes: ["id", "name"] },
      { model: Local, as: "local" },
      { model: User, as: "guestsData", attributes: ["id", "name", "username"] },
      { model: User, as: "user", attributes: ["id", "name"] },
    ],
  });
  return res.status(200).json({ count, matchs });
};

const show = async (req: Request, res: Response) => {
  const { matchId } = req.params;

  const match = await Partida.findByPk(matchId, {
    include: [
      { model: Sport, as: "sport", attributes: ["id", "name"] },
      { model: Local, as: "local" },
      { model: User, as: "guestsData", attributes: ["id", "name", "username"] },
      { model: User, as: "user", attributes: ["id", "name"] },
    ],
  });

  return res.status(200).json(match);
};

const create = async (req: Request, res: Response) => {
  const {
    name,
    status,
    note,
    userIdCreated,
    localId,
    sportId,
    limitUsers,
    countUsers,
    isPublic,
    day,
    startHour,
    endHour,
  } = req.body;
  const match = await Partida.create({
    name,
    status,
    note,
    userIdCreated,
    localId,
    sportId,
    day,
    startHour,
    endHour,
    limitUsers,
    countUsers,
    isPublic,
  });
  match.reload();

  return res.status(200).json(match);
};

const update = async (req: Request, res: Response) => {
  const { matchId } = req.params;
  const {
    name,
    status,
    note,
    userIdCreated,
    localId,
    sportId,
    limitUsers,
    countUsers,
    isPublic,
    day,
    startHour,
    endHour,
  } = req.body;
  Partida.update(
    {
      name,
      status,
      note,
      userIdCreated,
      localId,
      sportId,
      limitUsers,
      countUsers,
      isPublic,
      day,
      startHour,
      endHour,
    },
    { where: { id: matchId } },
  );
  const partida = await Partida.findByPk(matchId);
  partida?.reload();
  return res.status(200).json(partida);
};
const remove = async (req: Request, res: Response) => {
  const { matchId } = req.params;
  const match = await Partida.destroy({ where: { id: matchId } });
  return res.status(200).json(match);
};

export {
  index, create, update, remove, show,
};
