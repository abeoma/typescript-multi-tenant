import express from "express";
import userController from "./../../../../modules/user/controllers/user.controller";

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter
  .route("/")
  .post(userController.validation.createUser, userController.createUser)
  .get(userController.getUsers);

userRouter
  .route("/:id")
  .put(userController.validation.updateUser, userController.updateUser);

export { userRouter };
