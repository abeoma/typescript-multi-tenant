import { UserController } from "./../../../../subdomains/users/controllers/user";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("THIS IS USER LIST.");
});

userRouter.post("/", (req, res) => {
  const reg = req.app.get("registry");
  new UserController(reg).registerUser(req, res);
});

export { userRouter };
