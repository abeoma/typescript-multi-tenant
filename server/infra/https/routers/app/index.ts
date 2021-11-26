import express from "express";
import { userRouter } from "./user";

// eslint-disable-next-line new-cap
const appRouter = express.Router();

appRouter.get("/", (req, res) => {
  return res.send("This is the app.");
});
appRouter.use("/users", userRouter);

export { appRouter };
