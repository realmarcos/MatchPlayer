import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import logger from "../utils/logger";
import checkUserExists from "../services/authServices/checkUserExists";

export const signup = async (req: Request, res: Response) => {
  const {
    name, username, email, phone, password,
  } = req.body;

  const usernameExists = await checkUserExists(username);
  const emailExists = await checkUserExists(email);
  const phoneExists = await checkUserExists(phone);

  if (usernameExists) {
    return res.status(409).json({ message: `${username} user already exists` });
  } if (emailExists) {
    return res.status(409).json({ message: `${email} already exists` });
  } if (phoneExists) {
    return res.status(409).json({ message: `${phone} already exists` });
  }

  res.send("ok");
  // check if email already exists
  // User.findOne({
  //   where: {
  //     email: req.body.email,
  //     username: req.body.username,
  //   }
  // })
  //   .then(dbUser => {
  //     if (dbUser) {
  //       return res.status(409).json({ message: "user already exists" });
  //     } else if (req.body.email && req.body.password) {
  //       // password hash
  //       bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
  //         if (err) {
  //           return res.status(500).json({ message: "couldnt hash the password" });
  //         } else if (passwordHash) {
  //           return User.create({
  //             name: req.body.name,
  //             username: req.body.username,
  //             email: req.body.email,
  //             phone: req.body.phone,
  //             password: passwordHash
  //           })
  //             .then(() => {
  //               res.status(200).json({ message: "user created" });
  //             })
  //             .catch(err => {
  //               logger.error(err);
  //               res.status(502).json({ message: "error while creating the user" });
  //             });
  //         };
  //       });
  //     } else if (!req.body.password) {
  //       return res.status(400).json({ message: "password not provided" });
  //     } else if (!req.body.email) {
  //       return res.status(400).json({ message: "email not provided" });
  //     };
  //   })
  //   .catch(err => {
  //     logger.error(err);
  //   });
};
export const sigin = async (req: Request, res: Response) => {
  // checks if email exists
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(404).json({ message: "user not found" });
      }
      // password hash
      bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
        if (err) { // error while comparing
          res.status(502).json({ message: "error while checking user password" });
        } else if (compareRes) { // password match
          const token = jwt.sign({ email: req.body.email }, "secret", { expiresIn: "1h" });
          res.status(200).json({ message: "user logged in", token });
        } else { // password doesnt match
          res.status(401).json({ message: "invalid credentials" });
        }
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
export const isAuth = async (req: Request, res: Response) => {
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
  if (!decodedToken) {
    res.status(401).json({ message: "unauthorized" });
  } else {
    res.status(200).json({ message: "here is your resource" });
  }
};
