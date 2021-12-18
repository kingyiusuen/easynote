import { ConnectionOptions } from "typeorm";
import { User } from "../entities/User";
import { Notebook } from "../entities/Notebook";
import { Note } from "../entities/Note";
import { isProduction } from "../constants";

const devOptions: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "easynote",
  synchronize: true,
  entities: [User, Notebook, Note],
};

const prodOptions: ConnectionOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  database: "easynote",
  synchronize: true,
  extra: { ssl: true },
  entities: [User, Notebook, Note],
};

export default isProduction ? prodOptions : devOptions;
