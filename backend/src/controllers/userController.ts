/* eslint-disable import/prefer-default-export */
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import AppError from "../errors";
import Sport from "../models/sport";
import User from "../models/user";
import userSport from "../models/userssports";
import checkUserExists from "../services/authServices/checkUserExists";

export const index = async (req: Request, res: Response) => res.status(200).json({ message: "OK" });

export const update = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const {
    name, username, email, phone, sports,
    password,
  } = req.body;

  if (email) {
    const emailExists = await checkUserExists(email);
    if (emailExists) {
      throw new AppError("email_already_exists");
    }
  }
  if (phone) {
    const phoneExists = await checkUserExists(phone);
    if (phoneExists) {
      throw new AppError("phone_already_exists");
    }
  }
  if (username) {
    const usernameExists = await checkUserExists(username);
    if (usernameExists) {
      throw new AppError("username_already_exists");
    }
  }

  User.update(
    {
      name, username, email, phone,
    },
    {
      where: {
        id: userId,
      },
    },
  );
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError("user_not_found");
  }
  await user.reload();

  if (sports) {
    sports.forEach(() => {
      userSport.destroy({
        where: {
          userId,
        },
      });
    });
    sports.forEach((sport: number) => { // inser sport in user
      userSport.create({
        userId: user.id,
        sportId: sport,
      });
    });
  }

  bcrypt.compare(password, user.password, async (err, compareRes) => {
    if (err) {
      const passwordHash = await bcrypt.hash(password, 12);
      user.update({ password: passwordHash });
      user.reload();
    } if (compareRes) {
      throw new AppError("password_already_exists", 401);
    }
  });

  return res.status(200).json(user);
};

/** show user with sport */
export const show = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "username", "email", "phone", "picture"],
    include: { model: Sport, as: "sports", attributes: ["id", "name"] },
  });
  if (!user) {
    throw new AppError("user_not_found");
  }
  return res.status(200).json(user);
};
