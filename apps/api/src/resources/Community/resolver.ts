import { Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { ResourceResolver } from "../Resource";
import { Community } from "./entity";
import {
  CommunityCreateInput,
  CommunityDeletePayload,
  CommunityUpdateInput
} from "./input";

const resource = Community;
type resourceType = Community;

@Resolver(() => Community)
export class CommunityResolver extends ResourceResolver<resourceType>(
  resource,
  CommunityCreateInput,
  CommunityUpdateInput,
  CommunityDeletePayload,
  getRepository(resource)
) {}
