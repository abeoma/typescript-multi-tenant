import { Connection, createConnection, QueryRunner } from "typeorm";
import configs, { createTenantOrmConfig } from "./ormconfig";

const [defaultConfig, adminConfig, _] = configs;

export async function createAdminDatabaseConnection(): Promise<Connection> {
  return await createConnection(adminConfig);
}

export async function createTenantDatabaseConnection(
  tenantId: string
): Promise<Connection> {
  const config = createTenantOrmConfig(tenantId);
  console.log("TENANT DB CONNECTION BEGIN!!!!");
  return await createConnection(config);
}

async function executeSafe(
  conn: Connection,
  handler: (conn: Connection) => Promise<void>
): Promise<void> {
  try {
    await handler(conn);
  } catch (e) {
    console.error(e);
  } finally {
    await conn.close();
  }
}

export async function withConnection(
  handler: (conn: Connection) => Promise<void>
): Promise<void> {
  const conn = await createConnection(defaultConfig);
  await executeSafe(conn, handler);
}

export async function withAdminDbConnection(
  handler: (conn: Connection) => Promise<void>
): Promise<void> {
  const conn = await createAdminDatabaseConnection();
  await executeSafe(conn, handler);
}

export async function withTenantDbConnection(
  tenantId: string,
  handler: (conn: Connection) => Promise<void>
): Promise<void> {
  const conn = await createTenantDatabaseConnection(tenantId);
  await executeSafe(conn, handler);
}

export async function withQueryRunner(
  conn: Connection,
  handler: (queryRunner: QueryRunner) => Promise<void>
): Promise<void> {
  const queryRunner = conn.createQueryRunner();
  try {
    await handler(queryRunner);
  } finally {
    await queryRunner.release();
  }
}
