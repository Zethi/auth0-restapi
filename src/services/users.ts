import jwt from "jsonwebtoken";
import { User } from "../interfaces/User";
import { Op } from "sequelize";
import { Users } from "../models";
import config from "../configs/config";
export const users = {
  getAll: async (size?: number, from?: number) => {
    if (size && from) {
      return await Users.findAll({
        limit: size,
        where: { id: { [Op.gte]: from } },
      });
    }
    if (size) {
      return await Users.findAll({ limit: size });
    }
    if (from) {
      return await Users.findAll({ where: { id: { [Op.gte]: from } } });
    }
    return await Users.findAll();
  },

  getByUsername: async (username: string): Promise<Users[]> => {
    // return db.query(`SELECT * FROM users WHERE username = ?`, [username]);
    return await Users.findAll({ where: { username: username } });
  },
  getByEmail: async (email: string) => {
    // return db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return await Users.findAll({ where: { email: email } });
  },
  getById: async (id: number) => {
    // return db.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return await Users.findAll({ where: { id: id } });
  },
  create: async (user: User) => {
    await Users.create({
      username: user.username,
      password: user.password,
      email: user.email,
      administrator: user.administrator,
    });
  },
  delete: async (id: number) => {
    // return db.query(`DELETE FROM users WHERE id = ?`, [id]);
    return await Users.destroy({ where: { id: id } });
  },
  update: async (id: number, data: any) => {
    // return db.query(`UPDATE users SET ? WHERE id = ?`, [data, id]);
    return await Users.update(data, { where: { id: id } });
  },

  createJwt(user: User) {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        administrator: user.administrator,
      },
      config.encrypt.secret_key,
      { expiresIn: "2h" }
    );

    return token;
  },

  validateJwt(token: string) {
    return jwt.verify(token, config.encrypt.secret_key);
  },
};
