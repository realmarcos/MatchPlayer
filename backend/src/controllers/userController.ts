/* eslint-disable import/prefer-default-export */
import { Request, Response } from "express";
import Sport from "../models/sport";
import User from "../models/user";
import userSport from "../models/userssports";

export const index = async (req: Request, res: Response) => res.status(200).json({ message: "OK" });

export const teste = async (req: Request, res: Response) => {
  // await userSport.create({
  //   userId: 1,
  //   sportId: 1,
  // });
  const data = await User.findByPk(1, {
    attributes: [
      "name",
    ],
    include: [
      { model: Sport, as: "sports", attributes: ["name"] },
    ],
  });
  console.log(data);
  return res.status(200).json(data);
};
