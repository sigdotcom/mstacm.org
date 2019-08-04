import { getRepository } from "typeorm";

import { Product, ProductNames } from "../resources/Product";
import { Resume } from "../resources/Resume";
import { User } from "../resources/User";

export async function seedDatabase() {
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);
  const resumeRepository = getRepository(Resume);

  const defaultUser = userRepository.create({
    email: "test@mst.edu",
    firstName: "Kevin",
    googleSub: "123421",
    lastName: "Schoonover",
    profilePictureUrl: "./static/Guillermo.jpeg",
    graduationDate: new Date()
  });
  await userRepository.save(defaultUser);

  const resume = resumeRepository.create({
    added: new Date(),
    id: "test",
    url:
      "https://mstacm.blob.core.windows.net/resumes/7321f6d5-9051-4d16-85d8-9730b3e15d4b.pdf",
    user: defaultUser
  });
  await resumeRepository.save(resume);

  await productRepository
    .create({
      description: "Payment for ACM Yearly Membership",
      displayName: "ACM Yearly Membership",
      name: ProductNames.YEAR_MEMBERSHIP,
      price: 20
    })
    .save();

  await productRepository
    .create({
      description: "Payment for ACM Semesterly Membership",
      displayName: "ACM Semesterly Membership",
      name: ProductNames.SEMESTER_MEMBERSHIP,
      price: 11
    })
    .save();

  return {
    defaultUser
  };
}

export type Lazy<T extends object> = Promise<T> | T;
