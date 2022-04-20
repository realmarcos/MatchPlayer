import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateFromEmail } from "unique-username-generator";
import User from "../models/user";
import logger from "../utils/logger";
import checkUserExists from "../services/authServices/checkUserExists";
import AppError from "../errors";
import userSport from "../models/userssports";

interface RefreshTokenPayload {
  email: string;
  tokenVersion: number;
}

export const signup = async (req: Request, res: Response) => {
  const {
    name, email, phone, password, sports,
  } = req.body;
  const username = generateFromEmail(email, 3); // generate username with email
  const emailExists = await checkUserExists(email);
  const phoneExists = await checkUserExists(phone);

  if (emailExists) {
    throw new AppError("email_already_exists");
  } if (phoneExists) {
    throw new AppError("phone_already_exists");
  }

  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 12);
    if (passwordHash) {
      try {
        const user = await User.create({
          name,
          username,
          email,
          phone,
          password: passwordHash,
        });
        user.reload();
        sports.forEach((sport: number) => { // inser sport in user
          userSport.create({
            userId: user.id,
            sportId: sport,
          });
        });
        res.status(200).json({ message: "user created" });
      } catch (err) {
        res.status(502).json({ message: "error creating the user" });
      }
    }
  }
};
export const sigin = async (req: Request, res: Response) => {
  // checks if email exists
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    // eslint-disable-next-line consistent-return
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(404).json({ message: "user not found" });
      }
      // password hash
      bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
        if (err) { // error while comparing
          return res.status(502).json({ message: "error while checking user password" });
        } if (compareRes) { // password match
          const token = jwt.sign({ email: req.body.email }, "secret", { expiresIn: "1h" });
          return res.status(200).json({ user: dbUser, token });
        } // password doesnt match
        return res.status(502).json({ message: "invalid credentials" });
      });
    })
    .catch((err: any) => {
      logger.error(err);
    });
};
export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "not authenticated" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "could not decode the token" });
  }
  const { email } = decodedToken as RefreshTokenPayload;
  await User.findOne({
    where: {
      email,
    },
  });
  if (!decodedToken) {
    return res.status(401).json({ message: "unauthorized" });
  }
  return next();
};
