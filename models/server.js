import express from "express";
import router from "../routes/usuarios.js";
import routerAuth from "../routes/auth.js";
import { dbConnection } from "../database/config.js";
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/usuarios";
    this.authPath = "/api/auth"
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    dbConnection();
  }

  routes() {
    this.app.use(this.usuarioPath, router);
    this.app.use(this.authPath, routerAuth)
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("server online, port: ", this.port);
    });
  }
}

export default Server;
