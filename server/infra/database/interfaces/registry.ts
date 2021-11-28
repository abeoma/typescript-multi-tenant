import { UserRepository } from "../../../modules/user/user.repository";

export interface Registry {
  withTransaction(handler: (transaction: unknown) => void): Promise<void>;
  userRepository(): UserRepository;
}
