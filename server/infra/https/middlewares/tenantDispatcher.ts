import {
  createAdminDatabaseConnection,
  createTenantDatabaseConnection,
} from "../../database/typeorm/utils";
import { AdminRegistry } from "../../database/typeorm/adminRepos/adminRegistry";
import { TypeOrmRegistry } from "./../../database/typeorm/repositories/registry";
import assert from "assert";
import express from "express";

export const TENANT_DB_CONNECTION = "TENANT_DB_CONNECTION";

export const tenantDispatcher = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  // ADD: const tenantId = req.headers.host?.split(".")[0];
  const tenantId = "barasu-dev";
  assert(tenantId);
  const adminConn = await createAdminDatabaseConnection();
  const tenant = await new AdminRegistry(adminConn).fetchById(tenantId);
  await adminConn.close();

  const conn = await createTenantDatabaseConnection(tenant.id.toString());
  const registry = new TypeOrmRegistry(conn);
  req.services = { registry };
  res.on("finish", () => conn.close());
  next();
};
