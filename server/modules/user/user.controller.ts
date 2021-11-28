import { body, param } from "express-validator";
import express, { RequestHandler } from "express";
import { UserApplicationService } from "./user.service";
import { catchAsync } from "./../../infra/https/utils/catchAsync";
import { execValidation } from "./../../infra/https/middlewares/validator";

const NUM_PER_PAGE = 20;

const validation: Record<string, RequestHandler[]> = {};

validation.createUser = [
  body("id").optional(),
  body("email").isEmail(),
  body("firstName").exists(),
  body("lastName").exists(),
];
export const createUser = catchAsync(
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

validation.getUsers = [body("page").isInt().optional()];
export const getUsers = catchAsync(
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    execValidation(req, res);

    const { page = 1 } = req.body;
    const offset = (page - 1) * NUM_PER_PAGE;
    const reg = req.services.registry;
    const users = await new UserApplicationService(reg).fetchUsers({
      offset,
      limit: NUM_PER_PAGE,
    });
    return res.ok({ payload: users });
  }
);

validation.updateUser = [
  param("id"),
  body("email").isEmail(),
  body("firstName").exists(),
  body("lastName").exists(),
];
export const updateUser = catchAsync(
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

export { validation };
