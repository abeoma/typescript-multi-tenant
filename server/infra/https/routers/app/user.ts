import { UserController } from "./../../../../subdomains/users/controllers/user";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  const reg = req.app.get("registry");
  new UserController(reg).getUsers(req, res);
});

userRouter.post("/", (req, res) => {
  const reg = req.app.get("registry");
  new UserController(reg).createUser(req, res);
});

export { userRouter };
