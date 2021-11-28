import { Connection, EntityManager, Repository } from "typeorm";
import {
  ListArgs,
  UserRepository,
} from "../../../../modules/user/user.repository";
import { User } from "./../../../../modules/user/domain/user";
import { UserEmail } from "../../../../modules/user/domain/userEmail";
import { UserId } from "../../../../modules/user/domain/userId";
import { UserMap } from "../../../../modules/user/user.map";
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

export class UserRepositoryImpl implements UserRepository {
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

  async fetchList({ offset = 0, limit }: ListArgs): Promise<User[]> {
    const models = await this.repo.find({ skip: offset, take: limit });
    return models.map((model) => UserMap.toDomain(model));
  }

  async save(user: User, transactionManager?: EntityManager): Promise<void> {
    const data = UserMap.toPersistence(user);
    const model = this.repo.create(data);
    if (transactionManager) {
      await transactionManager.save(model);
      return;
    }
    this.repo.save(model);
  }
}
