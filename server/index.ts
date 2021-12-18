import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import AuthRoute from "./routes/auth.route";
import UsersRoute from "./routes/users.route";
import NotebooksRoute from "./routes/notebooks.route";
import NotesRoute from "./routes/notes.route";
import App from "./app";
import dbOptions from "./db/options";

const main = async () => {
  await createConnection(dbOptions);
  console.log("Database connected");

  const app = new App();
  app.init([
    new AuthRoute(),
    new UsersRoute(),
    new NotebooksRoute(),
    new NotesRoute(),
  ]);
  app.listen();
};

try {
  void main();
} catch (error) {
  console.log(error);
}
