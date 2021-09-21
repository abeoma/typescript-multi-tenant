import assert from "assert";
import { ConnectionOptions, createConnection, QueryRunner } from "typeorm";
import configs, { tenantIdToDatabaseName } from "../config/ormconfig";
import { ADMIN_DB_NAME } from "../defs";

const [defaultConfig, ..._] = configs;

const connect = async (
  config: ConnectionOptions,
  handler: (queryRunner: QueryRunner) => void
) => {
  const conn = await createConnection(config);
  const queryRunner = conn.createQueryRunner();
  await handler(queryRunner);
  await queryRunner.release();
  await conn.close();
};

export function createTenant(id: string): void {
  validateTenantId(id);
  // TODO
}

function validateTenantId(id: string) {
  assert(
    /^[a-z0-9_-]{3,20}$/.test(id),
    `TenantID should match "^[a-z0-9_-]{3,20}$", but ${id}`
  );
}

export function resetAll(): void {
  try {
    // delete all tenant db
  } finally {
    connect(defaultConfig, async (queryRunner) => {
      await queryRunner.dropDatabase(ADMIN_DB_NAME, true);
      await queryRunner.createDatabase(ADMIN_DB_NAME, true);
    });
  }
}

export function setupDevTenant(id: string): void {
  validateTenantId(id);
  const tenantDatabaseName = tenantIdToDatabaseName(id);
  connect(defaultConfig, async (queryRunner) => {
    await queryRunner.createDatabase(ADMIN_DB_NAME, true);

    await queryRunner.dropDatabase(tenantDatabaseName, true);
    await queryRunner.createDatabase(tenantDatabaseName, true);
  });
}
