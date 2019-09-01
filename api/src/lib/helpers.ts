import { getRepository } from "typeorm";

import { Event } from "../resources/Event";
import { Product } from "../resources/Product";
import { Sig } from "../resources/Sig";
import { User } from "../resources/User";

export async function seedDatabase() {
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);
  const sigRepository = getRepository(Sig);
  const eventRepository = getRepository(Event);

  const defaultUser = userRepository.create({
    email: "test@mst.edu",
    emailVerified: true,
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

  const defaultSig = sigRepository.create({
    description: "We do web stuff and stuff",
    name: "Web"
  });

  await sigRepository.save(defaultSig);

  const now = new Date();
  await eventRepository
    .create({
      creator: defaultUser,
      dateExpire: new Date(now.getTime() + 3 * 60000 * 60 * 24),
      dateHosted: new Date(now.getTime() + 2 * 60000 * 60 * 24),
      description: "Here we go, I am going outside now",
      eventLink: "https://acm.mst.edu",
      eventTitle: "Going outside with friends",
      flierLink: "https://source.unsplash.com/random",
      hostSigs: [defaultSig],
      location: "outside"
    })
    .save();

  return {
    defaultUser
  };
}

export type Lazy<T extends object> = Promise<T> | T;
