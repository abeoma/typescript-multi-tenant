import express from "express";
import { userRouter } from "./user";

// eslint-disable-next-line new-cap
const appRouter = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    router: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  appRouter.use(route.path, route.router);
});

export { appRouter };
