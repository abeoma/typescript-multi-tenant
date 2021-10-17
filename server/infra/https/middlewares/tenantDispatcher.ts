import assert from "assert";
import express from "express";
import { AdminRegistry } from "../../database/typeorm/adminRepos/adminRegistry";
import {
  createAdminDatabaseConnection,
  createTenantDatabaseConnection,
} from "../../database/typeorm/utils";

export const TENANT_DB_CONNECTION = "TENANT_DB_CONNECTION";

export const tenantDispatcher = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  // const tenantId = req.headers.host?.split(".")[0];
  const tenantId = "barasu-dev";
  assert(tenantId);
  const adminConn = await createAdminDatabaseConnection();
  const tenant = await new AdminRegistry(adminConn).fetchById(tenantId);
  await adminConn.close();

  const conn = await createTenantDatabaseConnection(tenant.id.value.toString());
  req.app.set(TENANT_DB_CONNECTION, conn);
  res.on("finish", () => req.app.get(TENANT_DB_CONNECTION).close());
  res.on("finish", () => console.log("DB CONNECTION CLOSE!!"));
  next();
};
