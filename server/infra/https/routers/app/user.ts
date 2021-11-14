import {
  UserController,
  validators,
} from "./../../../../subdomains/users/controllers/user";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => new UserController().getUsers(req, res));

userRouter.post(
  "/",
  validators.createUser,
  (req: express.Request, res: express.Response) =>
    new UserController().createUser(req, res)
);

export { userRouter };
