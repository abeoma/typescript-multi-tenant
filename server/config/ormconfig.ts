import { ConnectionOptions, DefaultNamingStrategy } from "typeorm";
import { snakeCase } from "typeorm/util/StringUtils";

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
  synchronize: false,
  logging: false,
  namingStrategy: new CustomNamingStrategy(),
};

const adminOrmconfig: ConnectionOptions = {
  ...baseConfig,
  name: "default",
  host: process.env.ADMIN_DB_HOST,
  port: parseInt(process.env.ADMIN_DB_PORT || "0", 10),
  username: process.env.ADMIN_DB_USER,
  password: process.env.ADMIN_DB_PASS,
  database: process.env.ADMIN_DB_NAME,
  entities: ["server/models/admin/**/*.ts"],
  migrations: ["server/migrations/admin/**/*.ts"],
  subscribers: ["server/subscribers/admin/**/*.ts"],
  cli: {
    entitiesDir: "server/models/admin",
    migrationsDir: "server/migrations/admin",
    subscribersDir: "server/subscribers/admin",
  },
};

const tenantOrmconfig: ConnectionOptions = {
  ...baseConfig,
  name: "tenant",
  host: process.env.APP_DB_HOST,
  port: parseInt(process.env.APP_DB_PORT || "0", 10),
  username: process.env.APP_DB_USER,
  password: process.env.APP_DB_PASS,
  database: process.env.APP_DB_NAME,
  entities: ["server/models/tenant/**/*.ts"],
  migrations: ["server/migrations/tenant/**/*.ts"],
  subscribers: ["server/subscribers/tenant/**/*.ts"],
  cli: {
    entitiesDir: "server/models/tenant",
    migrationsDir: "server/migrations/tenant",
    subscribersDir: "server/subscribers/tenant",
  },
};

export default [adminOrmconfig, tenantOrmconfig];
