import assert from "assert";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  QueryRunner,
} from "typeorm";
import configs, {
  createTenantOrmConfig,
  tenantIdToDbName,
} from "../infra/database/typeorm/ormconfig";
import { ADMIN_DB_NAME } from "../defs";
import { AdminRegistry } from "../infra/database/typeorm/adminRepos/adminRegistry";

const [defaultConfig, adminConfig, _] = configs;

async function withConnection(
  config: ConnectionOptions,
  handler: (conn: Connection) => Promise<void>
) {
  const conn = await createConnection(config);
  try {
    await handler(conn);
  } finally {
    await conn.close();
  }
}

async function withQueryRunner(
  conn: Connection,
  handler: (queryRunner: QueryRunner) => Promise<void>
) {
  const queryRunner = conn.createQueryRunner();
  try {
    await handler(queryRunner);
  } finally {
    await queryRunner.release();
  }
}

export async function migrateAdmin(): Promise<void> {
  await withConnection(adminConfig, async (conn) => {
    await conn.runMigrations();
  });
}

export function migrateAdminRollback(): void {
  withConnection(adminConfig, async (conn) => {
    await conn.undoLastMigration();
  });
}

// export function migrateTenants(): void;
// export function migrateTenantsRollback(): void;

export async function createAdminDatabaseIfNotExists(): Promise<void> {
  await withConnection(defaultConfig, async (conn) => {
    await withQueryRunner(conn, async (runner) => {
      await runner.createDatabase(ADMIN_DB_NAME, true);
    });
  });
  await migrateAdmin();
}

function validateTenantId(id: string) {
  assert(
    /^[a-z0-9_-]{3,20}$/.test(id),
    `TenantID should match "^[a-z0-9_-]{3,20}$", but ${id}`
  );
}

export async function createTenant(id: string): Promise<void> {
  validateTenantId(id);
  await withConnection(adminConfig, async (conn) => {
    await new AdminRegistry(conn).createTenant(id);
    await withQueryRunner(
      conn,
      async (runner) => await runner.createDatabase(tenantIdToDbName(id))
    );
  });
  const config = createTenantOrmConfig(id);
  await withConnection(config, async (conn) => {
    await conn.runMigrations();
  });
}

export async function setupDevTenant(id: string): Promise<void> {
  validateTenantId(id);
  await createAdminDatabaseIfNotExists();
  await withConnection(defaultConfig, async (conn) => {
    await withQueryRunner(conn, async (runner) => {
      await runner.dropDatabase(tenantIdToDbName(id), true);
    });
  });
  await createTenant(id);
}

export async function resetAll(): Promise<void> {
  async function dropAll() {
    await withConnection(adminConfig, async (conn) => {
      const tenants = await new AdminRegistry(conn).fetchAll();
      const tenantIds = tenants.map((t) => t.id.value.toString());
      await Promise.all(
        tenantIds.map((tid) =>
          withQueryRunner(conn, async (runner) => {
            runner.dropDatabase(tenantIdToDbName(tid));
          })
        )
      );
      await conn.dropDatabase();
    });
  }

  await withConnection(defaultConfig, async (conn) => {
    await withQueryRunner(conn, async (runner) => {
      if (await runner.hasDatabase(ADMIN_DB_NAME)) {
        await dropAll();
      }
    });
  });
  await createAdminDatabaseIfNotExists();
}
