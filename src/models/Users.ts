import { Model } from "sequelize";

export class Users extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare email: string;
  declare administrator: boolean;
}
