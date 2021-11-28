import { UserApplicationService } from "./../services/user.service";
import { body } from "express-validator";
import { catchAsync } from "./../../../infra/https/utils/catchAsync";
import { execValidation } from "./../../../infra/https/middlewares/validator";
import express from "express";

const validation: Record<string, unknown[]> = {};

validation.createUser = [
  body("email").isEmail(),
  body("firstName").exists(),
  body("lastName").exists(),
];
const createUser = catchAsync(
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    execValidation(req, res);

    const { id, email, firstName, lastName } = req.body;
    const reg = req.services.registry;
    await new UserApplicationService(reg).registerUser({
      id,
      email,
      firstName,
      lastName,
    });
    return res.ok();
  }
);

const getUsers = catchAsync(
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    const reg = req.services.registry;
    const users = await new UserApplicationService(reg).fetchUsers();
    return res.ok({ payload: users });
  }
);

validation.updateUser = [
  body("email").isEmail(),
  body("firstName").exists(),
  body("lastName").exists(),
];
const updateUser = catchAsync(
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    execValidation(req, res);
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;
    const reg = req.services.registry;
    await new UserApplicationService(reg).updateUser({
      id,
      email,
      firstName,
      lastName,
    });
    return res.ok();
  }
);

export default { createUser, getUsers, updateUser, validation };
