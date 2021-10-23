import { IRegistry } from "../../../infra/database/interfaces/registry";
import { ApplicationServiceException } from "../../../shared/core/ApplicationServiceException";
import { UserFactory } from "./../domain/factories/user";

export class UserApplicationService {
  private reg: IRegistry;

  constructor(reg: IRegistry) {
    this.reg = reg;
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
