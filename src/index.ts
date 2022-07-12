import express from "express";

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use("/api/blog/posts", require("./routes/posts/router"));
  }
}

export default new App().server;
