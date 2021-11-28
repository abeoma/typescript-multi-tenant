import {
  createTenant,
  migrateAdmin,
  resetAll,
  setupDevTenant,
} from "./migrate";
import yargs, { Arguments, Options } from "yargs";
import { assertIsString } from "@barasu/common/asserts";

type Command = {
  name: string;
  description?: string;
  options?: { [key: string]: Options };
  handler: (args: Arguments) => void;
};

const commands: Command[] = [
  {
    name: "migrate-all",
    handler: async () => {
      await migrateAdmin();
      // ADD: async migrateTenants();
    },
  },
  {
    name: "create-tenant",
    options: {
      tenantId: {
        alias: "t",
        type: "string",
        demandOption: true,
      },
    },
    handler: (args) => {
      assertIsString(args.tenantId);
      createTenant({ id: args.tenantId });
    },
  },
  {
    name: "reset-all",
    handler: async () => {
      await resetAll();
    },
  },
  {
    name: "setup-dev-tenant",
    options: {
      tenantId: {
        alias: "t",
        default: process.env.DEV_TENANT_ID,
        type: "string",
      },
    },
    handler: (args) => {
      assertIsString(args.tenantId);
      setupDevTenant(args.tenantId);
    },
  },
];

// eslint-disable-next-line no-magic-numbers
const parser = yargs.demandCommand(1).help();
commands.forEach(({ name, description = "", options: option = {}, handler }) =>
  yargs.command(name, description, option, handler)
);

// eslint-disable-next-line no-unused-expressions
parser.argv;
