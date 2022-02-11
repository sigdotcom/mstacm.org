import { Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { ResourceResolver } from "../Resource";
import { Sig } from "./entity";
import { SigCreateInput, SigDeletePayload, SigUpdateInput } from "./input";

const resource = Sig;
type resourceType = Sig;

@Resolver(() => Sig)
export class SigResolver extends ResourceResolver<resourceType>(
  resource,
  SigCreateInput,
  SigUpdateInput,
  SigDeletePayload,
  getRepository(resource)
) {}
