import {
  withAdminDbConnection,
  withConnection,
  withQueryRunner,
  withTenantDbConnection,
} from "../infra/database/typeorm/utils";
import { ADMIN_DB_NAME } from "../defs";
import { AdminRegistry } from "../infra/database/typeorm/adminRepos/adminRegistry";
import { SeedImporter } from "./seed";
import { TenantModel } from "./../infra/database/typeorm/models/admin/tenant";
import { tenantIdToDbName } from "../infra/database/typeorm/ormconfig";

export const migrateAdmin = async (): Promise<void> => {
  await withAdminDbConnection(async (conn) => {
    await conn.runMigrations();
  });
};

export const migrateAdminRollback = (): void => {
  withAdminDbConnection(async (conn) => {
    await conn.undoLastMigration();
  });
};

export const createAdminDatabaseIfNotExists = async (): Promise<void> => {
  await withConnection(async (conn) => {
    await withQueryRunner(conn, async (runner) => {
      await runner.createDatabase(ADMIN_DB_NAME, true);
    });
  });
  await migrateAdmin();
};

export const createTenant = async ({
  id,
  withSeed = false,
}: {
  id: string;
  withSeed?: boolean;
}): Promise<void> => {
  await withAdminDbConnection(async (conn) => {
    await new AdminRegistry(conn).createTenant(id);
    await withQueryRunner(conn, async (runner) => {
      await runner.createDatabase(tenantIdToDbName(id));
    });
  });
  await withTenantDbConnection(id, async (conn) => {
    await conn.runMigrations();
    if (withSeed) {
      await new SeedImporter(conn).runTenant();
    }
  });
};

export const setupDevTenant = async (id: string): Promise<void> => {
  await createAdminDatabaseIfNotExists();
  await withAdminDbConnection(async (conn) => {
    try {
      await conn
        .createQueryBuilder()
        .delete()
        .from(TenantModel)
        .where("id = :id", { id })
        .execute();
    } catch {
      // Do nothing
    }
    await withQueryRunner(conn, async (runner) => {
      await runner.dropDatabase(tenantIdToDbName(id), true);
    });
  });
  await createTenant({ id, withSeed: true });
};

export const resetAll = async (): Promise<void> => {
  const dropAll = async () => {
    await withAdminDbConnection(async (conn) => {
      const tenants = await new AdminRegistry(conn).fetchAll();
      const tenantIds = tenants.map((t) => t.id.toString());
      await Promise.all(
        tenantIds.map((tid) =>
          withQueryRunner(conn, async (runner) => {
            await runner.dropDatabase(tenantIdToDbName(tid));
          })
        )
      );
      await conn.dropDatabase();
    });
  };

  await withConnection(async (conn) => {
    await withQueryRunner(conn, async (runner) => {
      if (await runner.hasDatabase(ADMIN_DB_NAME)) {
        await dropAll();
      }
    });
  });
  await createAdminDatabaseIfNotExists();
};
