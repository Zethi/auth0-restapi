import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/User";

export function ValidateUser(req: Request, res: Response, next: NextFunction) {
  const user: User = req.body;

  if (!user.username) {
    res.status(400).json({ error: "The username is required" });
    return;
  }

  if (!user.email) {
    res.status(400).json({ error: "The email is required" });
    return;
  }

  if (!user.password) {
    res.status(400).json({ error: "The password is required" });
    return;
  }

  if (user.password.length < 6) {
    res
      .status(400)
      .json({ error: "The password must be at least 6 characters long" });
    return;
  }

  next();
}
