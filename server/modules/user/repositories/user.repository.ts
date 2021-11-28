import { User } from "./../domain/user";
import { UserEmail } from "./../domain/userEmail";
import { UserId } from "../domain/userId";

export interface UserRepository {
  fetchById(id: UserId): Promise<User | null>;
  fetchByEmail(email: UserEmail): Promise<User | null>;
  fetchList(): Promise<User[]>;
  save(user: User, transaction: unknown): Promise<void>;
}
