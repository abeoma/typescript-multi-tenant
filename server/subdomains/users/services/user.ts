import { UserMap } from "./../mappers/userMap";
import { UserDTO } from "./../dtos/userDTO";
import { IRegistry } from "../../../infra/database/interfaces/registry";
import { ApplicationServiceException } from "../../../shared/core/ApplicationServiceException";
import { UserFactory } from "./../domain/factories/user";
import { User } from "../domain/user";

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
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<void> {
    const user = UserFactory.newUser(data);
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
