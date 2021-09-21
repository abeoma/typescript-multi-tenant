import yargs, { Arguments, Options } from "yargs";
import { createTenant, resetAll, setupDevTenant } from "./migrate";
import { assertIsString } from "../../lib/asserts";

type Command = {
  name: string;
  description?: string;
  options?: { [key: string]: Options };
  handler: (args: Arguments) => void;
};

const commands: Command[] = [
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
      createTenant(args.tenantId);
    },
  },
  { name: "reset-all", handler: () => resetAll() },
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

const parser = yargs.demandCommand(1).help();
commands.forEach(({ name, description = "", options: option = {}, handler }) =>
  yargs.command(name, description, option, handler)
);
parser.argv;
