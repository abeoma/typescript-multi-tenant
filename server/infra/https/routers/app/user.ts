import {
  createUser,
  getUsers,
  updateUser,
  validation,
} from "./../../../../modules/user/user.controller";
import express from "express";

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter
  .route("/")
  .post(validation.createUser, createUser)
  .get(validation.getUsers, getUsers);

userRouter.route("/:id").put(validation.updateUser, updateUser);

export { userRouter };
