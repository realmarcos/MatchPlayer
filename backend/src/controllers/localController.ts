import { Request, Response } from "express";
import { Op } from "sequelize";
import Local from "../models/local";
import localSport from "../models/localsports";
import Sport from "../models/sport";
import User from "../models/user";

const show = async (req: Request, res: Response): Promise<Response> => {
  const { localId } = req.params;

  const local = await Local.findByPk(localId, {
    include: [
      { model: User, as: "user", attributes: ["id", "name"] },
      { model: Sport, as: "sports", attributes: ["id", "name"] },
    ],
  });

  return res.status(200).json(local);
};

const index = async (req: Request, res: Response) => {
  const { search, userIdCreated } = req.query;
  let whereCond;
  if (userIdCreated) {
    const newWhere = {
      [Op.or]: [
        {
          name: { [Op.substring]: search },
        },
        {
          description: { [Op.substring]: search },
        },
      ],
      userIdCreated,
    };
    whereCond = newWhere;
  } else if (search) {
    const newWhere = {
      [Op.or]: [
        {
          name: { [Op.substring]: search },
        },
        {
          description: { [Op.substring]: search },
        },
      ],
    };
    whereCond = newWhere;
  }

  const { count, rows: locals } = await Local.findAndCountAll({
    where: whereCond,
    order: [["createdAt", "DESC"]],
    include: [
      { model: User, as: "user", attributes: ["id", "name"] },
      { model: Sport, as: "sports", attributes: ["id", "name"] },
    ],
  });

  return res.status(200).json({ count, locals });
};

// create local
const create = async (req: Request, res: Response) => {
  const {
    name,
    description,
    userIdCreated,
    number,
    street,
    district,
    // city,
    complement,
    sports,
  } = req.body;

  const local = await Local.create({
    name,
    description,
    userIdCreated,
    number,
    street,
    district,
    // city,
    complement,
  });
  local.reload();

  sports.forEach((sport: number) => { // inser sport in user
    localSport.create({
      localId: local.id,
      sportId: sport,
    });
  });

  return res.status(200).json(local);
};

const remove = async (req: Request, res: Response) => {
  const { localId } = req.params;

  const local = await Local.destroy({
    where: { id: localId },
  });
  return res.status(200).json(local);
};

const update = async (req: Request, res: Response) => {
  const { localId } = req.params;
  const {
    name,
    description,
    userIdCreated,
    number,
    street,
    district,
    // city,
    complement,
    sports,
  } = req.body;

  Local.update(
    {
      name,
      description,
      userIdCreated,
      number,
      street,
      district,
      // city,
      complement,
    },
    { where: { id: localId } },
  );

  const local = await Local.findByPk(localId);
  await local?.reload();

  if (sports) {
    sports.forEach(() => {
      localSport.destroy({
        where: {
          localId,
        },
      });
    });
    sports.forEach((sport: number) => { // inser sport in local
      localSport.create({
        localId: +localId,
        sportId: sport,
      });
    });
  }
  return res.status(200).json(local);
};

export {
  index, create, show, remove, update,
};
