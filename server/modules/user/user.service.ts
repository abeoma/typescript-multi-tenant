import { AppException } from "../../shared/core/AppException";
import { Registry } from "../../infra/database/interfaces/registry";
import { User } from "./domain/user";
import { UserDTO } from "../../dtos";
import { UserEmail } from "./domain/userEmail";
import { UserFactory } from "./domain/factories/user.factory";
import { UserId } from "./domain/userId";
import { UserMap } from "./user.map";
import assert from "assert";
import generator from "generate-password";

export class UserApplicationService {
  private reg: Registry;

  constructor(reg: Registry) {
    this.reg = reg;
  }

  async fetchUsers(args: {
    offset: number;
    limit: number;
  }): Promise<UserDTO[]> {
    const users: User[] = await this.reg.userRepository().fetchList(args);
    return users.map((u) => UserMap.toDTO(u));
  }

  async registerUser(data: {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<void> {
    const password = generator.generate({
      length: 8,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
      // Only use !@#$%^&*
      // eslint-disable-next-line quotes
      exclude: '()+_-=}{[]|:;"/?.><,`~',
      strict: true,
    });
    const user = UserFactory.newUser({ ...data, password });
    const repo = this.reg.userRepository();
    if (await repo.fetchByEmail(user.email)) {
      throw new AppException("email_already_exists");
    }

    await this.reg.withTransaction(async (transaction) => {
      try {
        await repo.save(user, transaction);
      } catch (e: unknown) {
        throw new AppException("id_already_taken");
      }
    });
  }

  async updateUser({
    id,
    email,
    firstName,
    lastName,
  }: Omit<UserDTO, "isActive">): Promise<void> {
    const repo = this.reg.userRepository();

    const userEmail = UserEmail.create(email),
      userId = UserId.create(id);

    const user = await repo.fetchById(userId);
    assert(user);
    if (!user.email.equals(userEmail)) {
      const found = await repo.fetchByEmail(userEmail);
      if (found) {
        throw new AppException("email_already_exists");
      }
    }

    user.setEmail(userEmail);
    user.setName(firstName, lastName);

    await this.reg.withTransaction(async (transaction) => {
      await repo.save(user, transaction);
    });
  }
}
