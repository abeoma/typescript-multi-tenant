import "reflect-metadata";
import { appRouter } from "./infra/https/routers/app";
import { errorHandler } from "./infra/https/middlewares/errorHandler";
import express from "express";
import { tenantDispatcher } from "./infra/https/middlewares/tenantDispatcher";

const app = express();
const port = 5005;

app.use(express.json());
app.use(tenantDispatcher);
app.use("/api", appRouter);

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
