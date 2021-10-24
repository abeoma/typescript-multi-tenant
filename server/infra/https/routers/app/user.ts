import { UserController } from "./../../../../subdomains/users/controllers/user";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  new UserController().getUsers(req, res);
});

userRouter.post("/", (req, res) => {
  new UserController().createUser(req, res);
});

export { userRouter };
