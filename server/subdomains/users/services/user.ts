import { UserMap } from "./../mappers/userMap";
import { IRegistry } from "../../../infra/database/interfaces/registry";
import { ApplicationServiceException } from "../../../shared/core/ApplicationServiceException";
import { UserFactory } from "./../domain/factories/user";
import { User } from "../domain/user";
import { UserDTO } from "../../../dtos";
import generator from "generate-password";

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
    if (await repo.fetchById(user.id)) {
      throw new ApplicationServiceException(
        `Already exists user id: ${user.id}`
      );
    }
    await this.reg.withTransaction(async (transaction) => {
      await repo.save(user, transaction);
    });
  }
}
