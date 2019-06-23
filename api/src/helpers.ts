import { getRepository } from "typeorm";

import { User } from "./user/user.entity";

export async function seedDatabase() {
  const userRepository = getRepository(User);

  const defaultUser = userRepository.create({
    email: "test@mst.edu",
    firstName: "Kevin",
    lastName: "Schoonover"
  });
  await userRepository.save(defaultUser);

  return {
    defaultUser
  };
}

export type Lazy<T extends object> = Promise<T> | T;

export interface Context {
  user?: User;
}
