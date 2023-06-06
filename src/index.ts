import express from "express";
import helmet from "helmet";
import { CheckErrors, CheckJwt } from "./middlewares/";
const cors = require("cors");

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.server.use(CheckErrors);
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(cors());
  }

  routes() {
    this.server.use("/api/blog/posts", require("./routes/posts/router"));
    this.server.use("/api/users", CheckJwt, require("./routes/users/router"));
    this.server.use("/api/login", require("./routes/login/router"));
  }
}

export default new App().server;
