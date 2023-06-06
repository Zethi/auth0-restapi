import { Model } from "sequelize";

export class Posts extends Model {
  declare id: number;
  declare title: string;
  declare content: string;
  declare author_id: number;
}
