import { getRepository } from "typeorm";

import { User } from "../resources/User";

export async function seedDatabase() {
  const userRepository = getRepository(User);

  const defaultUser = userRepository.create({
    email: "test@mst.edu",
    firstName: "Kevin",
    googleSub: "123421",
    lastName: "Schoonover"
  });
  await userRepository.save(defaultUser);

  return {
    defaultUser
  };
}

export type Lazy<T extends object> = Promise<T> | T;
