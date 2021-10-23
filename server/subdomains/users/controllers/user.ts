import { UserApplicationService } from "./../services/user";
import { BaseController } from "../../../shared/infra/http/models/BaseController";
import express from "express";
import { IRegistry } from "../../../infra/database/interfaces/registry";

export class UserController extends BaseController {
  private reg: IRegistry;

  constructor(reg: IRegistry) {
    super();
    this.reg = reg;
  }

  async getUsers(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    const users = await new UserApplicationService(this.reg).fetchUsers();
    return this.ok(res, users);
  }

  async createUser(
    req: express.Request,
    res: express.Response
  ): Promise<unknown> {
    new UserApplicationService(this.reg).registerUser({
      email: `test+${String(Math.random())}@gmail.com`,
      password: "test",
      firstName: "taro",
      lastName: "sato",
    });
    return this.ok(res);
  }
}
