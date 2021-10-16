import assert from "assert";
import { tenantIdToDbName } from "../infra/database/typeorm/ormconfig";
import { ADMIN_DB_NAME } from "../defs";
import { AdminRegistry } from "../infra/database/typeorm/adminRepos/adminRegistry";
import { importSeed } from "./seed";
import {
  withAdminDbConnection,
  withConnection,
  withQueryRunner,
  withTenantDbConnection,
} from "../infra/database/typeorm/utils";

export async function migrateAdmin(): Promise<void> {
  await withAdminDbConnection(async (conn) => {
    await conn.runMigrations();
  });
}

export function migrateAdminRollback(): void {
  withAdminDbConnection(async (conn) => {
    await conn.undoLastMigration();
  });
}

// export function migrateTenants(): void;
// export function migrateTenantsRollback(): void;

export async function createAdminDatabaseIfNotExists(): Promise<void> {
  await withConnection(async (conn) => {
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
  await withAdminDbConnection(async (conn) => {
    await new AdminRegistry(conn).createTenant(id);
    await withQueryRunner(
      conn,
      async (runner) => await runner.createDatabase(tenantIdToDbName(id))
    );
  });
  await withTenantDbConnection(id, async (conn) => {
    await conn.runMigrations();
  });
}

export async function setupDevTenant(id: string): Promise<void> {
  validateTenantId(id);
  await createAdminDatabaseIfNotExists();
  await withConnection(async (conn) => {
    await withQueryRunner(conn, async (runner) => {
      await runner.dropDatabase(tenantIdToDbName(id), true);
    });
  });
  await createTenant(id);
  await withTenantDbConnection(id, async (conn) => await importSeed(conn));
}

export async function resetAll(): Promise<void> {
  async function dropAll() {
    await withAdminDbConnection(async (conn) => {
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

  await withConnection(async (conn) => {
    await withQueryRunner(conn, async (runner) => {
      if (await runner.hasDatabase(ADMIN_DB_NAME)) {
        await dropAll();
      }
    });
  });
  await createAdminDatabaseIfNotExists();
}
