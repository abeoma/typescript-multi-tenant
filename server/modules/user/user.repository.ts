import { User } from "./domain/user";
import { UserEmail } from "./domain/userEmail";
import { UserId } from "./domain/userId";

export type ListArgs = { offset?: number; limit?: number };

export interface UserRepository {
  fetchById(id: UserId): Promise<User | null>;
  fetchByEmail(email: UserEmail): Promise<User | null>;
  fetchList(args: ListArgs): Promise<User[]>;
  save(user: User, transaction: unknown): Promise<void>;
}
