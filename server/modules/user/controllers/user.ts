import { BaseController } from "../../../shared/infra/http/models/BaseController";
import { UserApplicationService } from "./../services/user";
import { body } from "express-validator";
import express from "express";

export const validators = {
  createUser: [
    body("email").isEmail(),
    body("firstName").exists(),
    body("lastName").exists(),
  ],
  updateUser: [
    body("email").isEmail(),
    body("firstName").exists(),
    body("lastName").exists(),
  ],
};

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
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> {
    this.execValidation(req, res);

    const { id, email, firstName, lastName } = req.body;
    const reg = req.services.registry;
    try {
      await new UserApplicationService(reg).registerUser({
        id,
        email,
        firstName,
        lastName,
      });
    } catch (e) {
      next(e);
    }
    return this.ok(res);
  }

  async updateUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<unknown> {
    this.execValidation(req, res);

    const { id } = req.params;
    const { email, firstName, lastName } = req.body;
    const reg = req.services.registry;
    try {
      await new UserApplicationService(reg).updateUser({
        id,
        email,
        firstName,
        lastName,
      });
    } catch (e) {
      next(e);
    }
    return this.ok(res);
  }
}
