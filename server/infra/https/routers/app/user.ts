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
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    new UserController().createUser(req, res, next)
);

userRouter.put(
  "/:id",
  validators.updateUser,
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    new UserController().updateUser(req, res, next)
);

export { userRouter };
