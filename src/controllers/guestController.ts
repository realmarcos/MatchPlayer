import { Request, Response } from "express";
import Guest from "../models/guest";

const show = async (req: Request, res: Response): Promise<Response> => {
  const { localId } = req.params;

  // const local = await Guest.findByPk(localId, {
  //   include: [
  //     { model: User, as: "user", attributes: ["id", "name"] },
  //     { model: Sport, as: "sports", attributes: ["id", "name"] },
  //   ],
  // });

  return res.status(200).json("local");
};

// const index = async (req: Request, res: Response) => {

//   return res.status(200).json('count', 'locals');
// };

const create = async (req: Request, res: Response) => {
  const { userId, matchId } = req.body;

  const guest = await Guest.create({
    userId,
    matchId,
  });
  return res.status(200).json(guest);
};

const remove = async (req: Request, res: Response) => {
  const { guestId } = req.params;
  const match = await Guest.destroy({
    where: { id: guestId },
  });
  return res.status(200).json(match);
};

export { create, show, remove };
