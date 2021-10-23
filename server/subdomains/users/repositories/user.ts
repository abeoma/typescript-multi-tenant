import { UserEmail } from "./../domain/userEmail";
import { User } from "./../domain/user";
import { UserId } from "../domain/userId";

export interface IUserRepository {
  fetchById(id: UserId): Promise<User>;
  fetchByEmail(email: UserEmail): Promise<User>;
  save(user: User, transaction: unknown): Promise<void>;
}
