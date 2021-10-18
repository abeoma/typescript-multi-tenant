import { UserController } from "./../../../../subdomains/users/controllers/user";
import express from "express";
import { Connection } from "typeorm";
import { UserRepository } from "../../../database/typeorm/repositories/user";
import { TENANT_DB_CONNECTION } from "../../middlewares/tenantDispatcher";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("THIS IS USER LIST.");
});

userRouter.post("/", (req, res) => {
  const conn: Connection = req.app.get(TENANT_DB_CONNECTION);
  const repo = new UserRepository(conn);
  new UserController(repo).createUser(req, res);
});

export { userRouter };
