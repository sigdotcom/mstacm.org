import { getRepository } from "typeorm";

import { Product } from "../resources/Product";
import { User } from "../resources/User";

export async function seedDatabase() {
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);

  const defaultUser = userRepository.create({
    email: "test@mst.edu",
    firstName: "Kevin",
    sub: "123421",
    lastName: "Schoonover"
  });
  await userRepository.save(defaultUser);

  await productRepository
    .create({
      description: "Payment for ACM Yearly Membership",
      displayName: "ACM Yearly Membership",
      tag: "yearly-membership",
      price: 20
    })
    .save();

  await productRepository
    .create({
      description: "Payment for ACM Semesterly Membership",
      displayName: "ACM Semesterly Membership",
      tag: "semesterly-membership",
      price: 11
    })
    .save();

  return {
    defaultUser
  };
}

export type Lazy<T extends object> = Promise<T> | T;
