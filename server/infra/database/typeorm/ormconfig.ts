import {
  ADMIN_DB_HOST,
  ADMIN_DB_NAME,
  ADMIN_DB_PASS,
  ADMIN_DB_PORT,
  ADMIN_DB_USER,
} from "../../../defs";
import { ConnectionOptions, DefaultNamingStrategy } from "typeorm";
import path from "path";
import { snakeCase } from "typeorm/util/StringUtils";

const migrationPath = (p: string) => path.join(__dirname, "migrations", p);
const modelPath = (p: string) => path.join(__dirname, "models", p);

/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class CustomNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName || snakeCase(targetName);
  }

  columnName(
    propertyName: string,
    customName: string,
    _embeddedPrefixes: string[]
  ): string {
    return customName || snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string) {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  // eslint-disable-next-line max-params
  joinTableName(
    firstTableName: string,
    secondTableName: string,
    _firstPropertyName: string,
    _secondPropertyName: string
  ) {
    return snakeCase(`${firstTableName}_${secondTableName}`);
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName: string
  ) {
    return snakeCase(`${tableName}_${columnName || propertyName}`);
  }
}

const baseConfig: { type: "mysql" } & Record<
  string,
  string | string[] | number | boolean | CustomNamingStrategy
> = {
  type: "mysql",
  charset: "utf8mb4",
  synchronize: false,
  logging: ["error", "warn"],
  namingStrategy: new CustomNamingStrategy(),
  host: ADMIN_DB_HOST,
  port: ADMIN_DB_PORT,
  username: ADMIN_DB_USER,
  password: ADMIN_DB_PASS,
};

const defaultOrmConfig: ConnectionOptions = {
  ...baseConfig,
  name: "default",
};

const adminOrmConfig: ConnectionOptions = {
  ...baseConfig,
  name: "admin",
  database: ADMIN_DB_NAME,
  entities: [modelPath("admin/**/*.ts")],
  migrations: [migrationPath("admin/**/*.ts")],
  cli: {
    entitiesDir: modelPath("admin"),
    migrationsDir: migrationPath("admin"),
  },
};

const baseTenantOrmConfig = {
  ...baseConfig,
  name: "tenant",
  entities: [modelPath("tenant/**/*.ts")],
  migrations: [migrationPath("tenant/**/*.ts")],
  cli: {
    entitiesDir: modelPath("tenant"),
    migrationsDir: migrationPath("tenant"),
  },
};

export const tenantIdToDbName = (id: string) => {
  return `t_${id}`;
};

export const createTenantOrmConfig = (id: string): ConnectionOptions => {
  return {
    ...baseTenantOrmConfig,
    database: tenantIdToDbName(id),
  };
};

// Only for `typeorm migration:generate`
const devTenantOrmConfig = {
  ...baseTenantOrmConfig,
  database: tenantIdToDbName(process.env.DEV_TENANT_ID || ""),
};

export default [defaultOrmConfig, adminOrmConfig, devTenantOrmConfig];
