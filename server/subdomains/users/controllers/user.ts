import { CreateUserUseCase } from "./../usecases/createUserUsecase";
import { BaseController } from "../../../shared/infra/http/models/BaseController";
import express from "express";
import { IUserRepository } from "../repositories/user";

export class UserController extends BaseController {
  private repo: IUserRepository;

  constructor(repo: IUserRepository) {
    super();
    this.repo = repo;
  }

  async createUser(
    req: express.Request,
    res: express.Response
  ): Promise<unknown> {
    new CreateUserUseCase(this.repo).execute({
      email: `test+${String(Math.random())}@gmail.com`,
      password: "test",
      firstName: "taro",
      lastName: "sato",
    });
    return this.ok(res);
  }
}
