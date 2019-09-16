import { getRepository } from "typeorm";

import { Event } from "../resources/Event";
import { Product } from "../resources/Product";
import { Sig } from "../resources/Sig";
import { User } from "../resources/User";

export type Lazy<T extends object> = Promise<T> | T;
