import { NextFunction, Request, Response } from "express";
import { Post } from "../interfaces/Post";

export function ValidatePost(req: Request, res: Response, next: NextFunction) {
  const post: Post = req.body;

  if (!post.title) {
    res.status(400).json({ error: "The title is required" });
    return;
  }
  // if (!post.description) {
  //   res.status(400).json({ error: "The description is required" });
  //   return;
  // }
  // if (!post.author_id) {
  //   res.status(400).json({ error: "The author_id is required" });
  //   return;
  // }
  // if (!post.created_at) {
  //   res.status(400).json({ error: "The created_at is required" });
  //   return;
  // }
  // if (!post.updated_at) {
  //   res.status(400).json({ error: "The updated_at is required" });
  //   return;
  // }

  next();
}
