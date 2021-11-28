import { Connection, QueryRunner, createConnection } from "typeorm";
import configs, { createTenantOrmConfig } from "./ormconfig";

const [defaultConfig, adminConfig, _] = configs;

export const createAdminDatabaseConnection = (): Promise<Connection> => {
  return createConnection(adminConfig);
};

export const createTenantDatabaseConnection = (
  tenantId: string
): Promise<Connection> => {
  const config = createTenantOrmConfig(tenantId);
  return createConnection(config);
};

const executeSafe = async (
  conn: Connection,
  handler: (c: Connection) => Promise<void>
): Promise<void> => {
  try {
    await handler(conn);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  await conn.close();
};

export const withConnection = async (
  handler: (conn: Connection) => Promise<void>
): Promise<void> => {
  const conn = await createConnection(defaultConfig);
  await executeSafe(conn, handler);
};

export const withAdminDbConnection = async (
  handler: (conn: Connection) => Promise<void>
): Promise<void> => {
  const conn = await createAdminDatabaseConnection();
  await executeSafe(conn, handler);
};

export const withTenantDbConnection = async (
  tenantId: string,
  handler: (conn: Connection) => Promise<void>
): Promise<void> => {
  const conn = await createTenantDatabaseConnection(tenantId);
  await executeSafe(conn, handler);
};

export const withQueryRunner = async (
  conn: Connection,
  handler: (queryRunner: QueryRunner) => Promise<void>
): Promise<void> => {
  const queryRunner = conn.createQueryRunner();
  try {
    await handler(queryRunner);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  await queryRunner.release();
};
