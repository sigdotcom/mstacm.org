import { Authorized, Query, Resolver } from "type-graphql";

import { RedemptionCode } from "./entity";

/**
 * GraphQL Resolver for RedemptionCodes
 */
@Resolver((resolverType: void) => RedemptionCode)
export class RedemptionCodeResolver {
  @Authorized("SUPERADMIN")
  @Query((returns: void) => [RedemptionCode])
  public async redemptionCodes(): Promise<RedemptionCode[]> {
    return RedemptionCode.find();
  }
}
