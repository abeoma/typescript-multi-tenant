import { UserInterface } from "@barasu/common/interfaces";

export type User = UserInterface;
export const USER = new Entity<User>("users");
