import { Posts } from "../models";
import { Post } from "../interfaces/Post";
import { Op } from "sequelize";

export const posts = {
  getAll: async (size?: number, from?: number) => {
    if (size && from) {
      return await Posts.findAll({
        limit: size,
        where: { id: { [Op.gte]: from } },
      });
    }
    if (size) {
      return await Posts.findAll({ limit: size });
    }
    if (from) {
      return await Posts.findAll({ where: { id: { [Op.gte]: from } } });
    }
    return await Posts.findAll();
  },
  getById: async (id: number) => {
    return await Posts.findAll({ where: { id: id } });
  },
  create: async (post: Post) => {
    return await Posts.create({
      title: post.title,
      content: post.content,
      author_id: post.author_id,
    });
  },
  delete: async (id: number) => {
    // return db.query(`DELETE FROM posts WHERE id = ?`, [id]);
    return await Posts.destroy({ where: { id: id } });
  },
  update: async (id: number, data: any) => {
    // return db.query(`UPDATE posts SET ? WHERE id = ?`, [data, id]);
    return await Posts.update(data, { where: { id: id } });
  },
};
