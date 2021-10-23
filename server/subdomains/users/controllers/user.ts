import { UserApplicationService } from "./../services/user";
import { BaseController } from "../../../shared/infra/http/models/BaseController";
import express from "express";

export class UserController extends BaseController {
  async getUsers(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    const reg = req.services.registry;
    const users = await new UserApplicationService(reg).fetchUsers();
    return this.ok(res, users);
  }

  async createUser(
    req: express.Request,
    res: express.Response
  ): Promise<unknown> {
    const reg = req.services.registry;
    new UserApplicationService(reg).registerUser({
      email: `test+${String(Math.random())}@gmail.com`,
      password: "test",
      firstName: "taro",
      lastName: "sato",
    });
    return this.ok(res);
  }
}
