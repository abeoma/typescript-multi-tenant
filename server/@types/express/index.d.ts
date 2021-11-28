import { IRegistry } from "../database/interfaces/registry";

declare module "express-serve-static-core" {
  export interface Request {
    services: { registry: IRegistry };
  }
  export interface Response {
    ok: ({
      payload,
      meta,
    }?: {
      payload?: unknown;
      meta?: Record<Omit<string, "status">, unknown>;
    }) => Response;
    ng: (errcode: string) => Response;
  }
}
