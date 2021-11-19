import { errorHandler } from "./infra/https/middlewares/errorHandler";
import express from "express";
import "reflect-metadata";
import { tenantDispatcher } from "./infra/https/middlewares/tenantDispatcher";
import { appRouter } from "./infra/https/routers/app";

const app = express();
const port = 5005;

app.use(express.json());
app.use(tenantDispatcher);
app.use("/api", appRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
