import { IRegistry } from "../database/interfaces/registry";

declare module "express-serve-static-core" {
  export interface Request {
    services: { registry: IRegistry };
  }
}
