import { NextFunction, Request, Response } from "express";

export function CheckErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  return res.status(status).json({ error: error.toString() });
}
