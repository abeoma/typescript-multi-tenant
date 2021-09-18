import { ConnectionOptions, DefaultNamingStrategy } from "typeorm";
import { snakeCase } from "typeorm/util/StringUtils";
import {
  ADMIN_DB_HOST,
  ADMIN_DB_NAME,
  ADMIN_DB_PASS,
  ADMIN_DB_PORT,
  ADMIN_DB_USER,
} from "../defs";

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
  string | boolean | CustomNamingStrategy
> = {
  type: "mysql",
  charset: "utf8mb4",
  synchronize: false,
  logging: false,
  namingStrategy: new CustomNamingStrategy(),
};

const defaultOrmConfig: ConnectionOptions = {
  ...baseConfig,
  name: "default",
  host: ADMIN_DB_HOST,
  port: ADMIN_DB_PORT,
  username: ADMIN_DB_USER,
  password: ADMIN_DB_PASS,
};

const adminOrmConfig: ConnectionOptions = {
  ...baseConfig,
  name: "admin",
  host: ADMIN_DB_HOST,
  port: ADMIN_DB_PORT,
  username: ADMIN_DB_USER,
  password: ADMIN_DB_PASS,
  database: ADMIN_DB_NAME,
  entities: ["server/models/admin/**/*.ts"],
  migrations: ["server/migrations/admin/**/*.ts"],
  subscribers: ["server/subscribers/admin/**/*.ts"],
  cli: {
    entitiesDir: "server/models/admin",
    migrationsDir: "server/migrations/admin",
    subscribersDir: "server/subscribers/admin",
  },
};

const tenantOrmConfig: ConnectionOptions = {
  ...baseConfig,
  name: "tenant",
  host: ADMIN_DB_HOST,
  port: ADMIN_DB_PORT,
  username: ADMIN_DB_USER,
  password: ADMIN_DB_PASS,
  entities: ["server/models/tenant/**/*.ts"],
  migrations: ["server/migrations/tenant/**/*.ts"],
  subscribers: ["server/subscribers/tenant/**/*.ts"],
  cli: {
    entitiesDir: "server/models/tenant",
    migrationsDir: "server/migrations/tenant",
    subscribersDir: "server/subscribers/tenant",
  },
};

export default [defaultOrmConfig, adminOrmConfig, tenantOrmConfig];
