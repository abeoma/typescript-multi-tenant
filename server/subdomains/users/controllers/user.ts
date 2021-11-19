import { AppExceptionCode } from "./../../../exceptions";
import { UserApplicationService } from "./../services/user";
import { BaseController } from "../../../shared/infra/http/models/BaseController";
import express from "express";
import { body } from "express-validator";
import { AppException } from "../../../shared/core/AppException";

export const validators = {
  createUser: [
    body("email").isEmail(),
    body("firstName").exists(),
    body("lastName").exists(),
  ],
};

export class UserController extends BaseController<AppExceptionCode> {
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
    } catch (e: unknown) {
      if (e instanceof AppException) {
        return this.fail(res, e.code);
      }
    }

    return this.ok(res);
  }
}
