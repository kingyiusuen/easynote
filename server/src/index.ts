import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import AuthRoute from "./routes/auth.route";
import UsersRoute from "./routes/users.route";
import App from "./app";
import { User } from "./entities/User";
import { Notebook } from "./entities/Notebook";
import { Note } from "./entities/Note";

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "easynote",
  entities: [User, Notebook, Note],
})
  .then(async (_connection) => {
    console.log("Database connected");

    const app = new App();
    app.init([new AuthRoute(), new UsersRoute()]);
    app.listen();
  })
  .catch((error) => console.log(error));
