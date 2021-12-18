import express from "express";
import cors from "cors";
import { getRepository } from "typeorm";
import passport from "passport";
import path from "path";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Routes } from "./interfaces/routes.interface";
import { DataStoredInToken } from "./interfaces/auth.interface";
import errorMiddleware from "./middlewares/error.middleware";
import { User } from "./entities/User";

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.env = process.env.NODE_ENV || "development";
  }

  public init(routes: Routes[]) {
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    if (process.env.NODE_ENV === "production") {
      this.serveFrontend();
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Running in ${this.env} environment`);
      console.log(`Server listening on port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    this.configurePassport();
  }

  private configurePassport() {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(
      new JwtStrategy(options, async (jwtPayload: DataStoredInToken, done) => {
        try {
          const userRepository = getRepository(User);
          const findUser = await userRepository.findOne(jwtPayload.id);
          if (findUser) {
            return done(null, findUser);
          } else {
            return done(null, false, { message: "User does not exist" });
          }
        } catch (error) {
          console.log(error);
        }
      })
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private serveFrontend() {
    const buildPath = path.resolve(__dirname, "../client/build");
    this.app.use(express.static(buildPath));
    this.app.get("*", (_req, res) => {
      res.sendFile("index.html", { root: buildPath });
    });
  }
}

export default App;
