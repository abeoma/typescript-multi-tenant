import { User } from "./../../../../subdomains/users/domain/user";
import { UserId } from "../../../../subdomains/users/domain/userId";
import { UserEmail } from "../../../../subdomains/users/domain/userEmail";
import { UserMap } from "./../../../../subdomains/users/mappers/userMap";
import { Connection, EntityManager, Repository } from "typeorm";
import { IUserRepository } from "../../../../subdomains/users/repositories/user";
import { UserModel } from "../models/tenant/user";

export class UserRepository implements IUserRepository {
  private repo: Repository<UserModel>;

  constructor(conn: Connection) {
    this.repo = conn.getRepository(UserModel);
  }

  async fetchById(id: UserId): Promise<User | undefined> {
    const model = await this.repo.findOne(id.toString());
    return model ? modelToDomain(model) : undefined;
  }

  async fetchByEmail(email: UserEmail): Promise<User | undefined> {
    const model = await this.repo.findOne({ email: email.value });
    return model ? modelToDomain(model) : undefined;
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

function modelToDomain(model: UserModel): User {
  return UserMap.toDomain({
    id: model.id,
    email: model.email,
    // password: "",
    // passwordSalt: "",
    firstName: model.firstName,
    lastName: model.lastName,
    isActive: model.isActive,
  });
}
