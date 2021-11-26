import { Connection, EntityManager, Repository } from "typeorm";
import { IUserRepository } from "../../../../subdomains/users/repositories/user";
import { User } from "./../../../../subdomains/users/domain/user";
import { UserEmail } from "../../../../subdomains/users/domain/userEmail";
import { UserId } from "../../../../subdomains/users/domain/userId";
import { UserMap } from "./../../../../subdomains/users/mappers/userMap";
import { UserModel } from "../models/tenant/user";

const modelToDomain = (model: UserModel): User => {
  return UserMap.toDomain({
    id: model.id,
    email: model.email,
    firstName: model.firstName,
    lastName: model.lastName,
    isActive: model.isActive,
  });
};

export class UserRepository implements IUserRepository {
  private repo: Repository<UserModel>;

  constructor(conn: Connection) {
    this.repo = conn.getRepository(UserModel);
  }

  async fetchById(id: UserId): Promise<User | null> {
    const model = await this.repo.findOne(id.toString());
    return model ? modelToDomain(model) : null;
  }

  async fetchByEmail(email: UserEmail): Promise<User | null> {
    const model = await this.repo.findOne({ email: email.value });
    return model ? modelToDomain(model) : null;
  }

  async fetchList(): Promise<User[]> {
    const models = await this.repo.find();
    return models.map((model) => UserMap.toDomain(model));
  }

  async save(user: User, transactionManager: EntityManager): Promise<void> {
    const data = UserMap.toPersistence(user);
    const model = this.repo.create(data);
    if (transactionManager) {
      await transactionManager.save(model);
      return;
    }
    this.repo.save(model);
  }
}
