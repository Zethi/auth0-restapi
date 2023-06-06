import { DataTypes, Sequelize } from "sequelize";
import { Users, Posts } from "../models";
import config from "../configs/config";

export class db {
  static connection = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password as string,
    {
      host: config.db.host,
      dialect: "mysql",
      port: Number(config.db.port),
    }
  );
  static connected = false;

  static connect() {
    if (!db.connected) {
      this.connection
        .authenticate()
        .then(() => {
          console.log("Database connected successfully");
        })
        .catch((err: string) => {
          console.error("Unable to connect to the database:", err);
        });
    }
  }

  static setUpTables() {
    // Users table
    Users.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(80),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(320),
          allowNull: false,
          unique: true,
        },
        administrator: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      { sequelize: db.connection, modelName: "users", tableName: "users" }
    );

    // Posts table
    Posts.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        author_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize: db.connection, modelName: "posts", tableName: "posts" }
    );
    Users.sync();
    Posts.sync();
  }
}
