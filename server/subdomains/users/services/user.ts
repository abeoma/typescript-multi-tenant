import { UserEmail } from "./../domain/userEmail";
import { UserMap } from "./../mappers/userMap";
import { IRegistry } from "../../../infra/database/interfaces/registry";
import { UserFactory } from "./../domain/factories/user";
import { User } from "../domain/user";
import { UserDTO } from "../../../dtos";
import generator from "generate-password";
import { AppException } from "../../../shared/core/AppException";
import { UserId } from "../domain/userId";
import assert from "assert";

export class UserApplicationService {
  private reg: IRegistry;

  constructor(reg: IRegistry) {
    this.reg = reg;
  }

  async fetchUsers(): Promise<UserDTO[]> {
    const users: User[] = await this.reg.userRepository().fetchList();
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
      // eslint-disable-next-line quotes
      exclude: '()+_-=}{[]|:;"/?.><,`~', // only use !@#$%^&*
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
  }: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<void> {
    const repo = this.reg.userRepository();

    const userId = UserId.create(id);
    const user = await repo.fetchById(userId);
    assert(user);

    const userEmail = UserEmail.create(email);
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
