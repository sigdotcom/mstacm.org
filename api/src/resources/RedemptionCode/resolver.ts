import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { BadUserInputError } from "../../lib/errors";
import { IContext } from "../../lib/interfaces";
import {
  fulfillProduct,
  MembershipTypes,
  createTransactionFromTags
} from "../../lib/products";

import { Product } from "../Product";
import { Purchase } from "../Purchase";
import { Transaction } from "../Transaction";
import { User } from "../User";
import { RedemptionCode } from "./entity";

const nanoid = require("nanoid");

const FOURTEEN_DAYS_IN_MILLISECONDS: number = 12096e5;

/**
 * GraphQL Resolver for RedemptionCodes
 */
@Resolver(() => RedemptionCode)
export class RedemptionCodeResolver {
  @Authorized("view:redemption_codes")
  @Query(() => [RedemptionCode])
  public async redemptionCodes(): Promise<RedemptionCode[]> {
    return RedemptionCode.find();
  }

  @Authorized("create:redemption_codes")
  @Mutation(() => RedemptionCode)
  public async createMembershipRedemptionCode(
    @Arg("membershipType", () => MembershipTypes)
    membershipType: MembershipTypes
  ): Promise<RedemptionCode> {
    const transaction: Promise<Transaction> = createTransactionFromTags(
      [membershipType.toString()],
      true
    );

    // Redemption code is not tied to a user therefore anyone could technically
    // redeem this code. It my be wise in the future to allow a user to be
    // attached to a redemption code.
    const redemptionCode = RedemptionCode.create({
      expirationDate: new Date(Date.now() + FOURTEEN_DAYS_IN_MILLISECONDS),
      id: nanoid(12),
      transaction: await transaction
    });

    return redemptionCode.save();
  }

  @Authorized()
  @Mutation(() => RedemptionCode)
  public async redeemRedemptionCode(
    @Ctx() context: IContext,
    @Arg("redemptionCode") code: string
  ): Promise<RedemptionCode> {
    const user: User = context.state.user as User;
    const redemptionCode: RedemptionCode = await RedemptionCode.findOneOrFail({
      id: code
    });

    if (redemptionCode.redeemed || new Date() > redemptionCode.expirationDate) {
      throw new BadUserInputError(
        "Redemption code has expired or already been redeemed."
      );
    }

    const transaction: Transaction = await redemptionCode.transaction;
    transaction.user = user;
    await transaction.save();
    const purchases: Purchase[] = await transaction.purchases;

    if (purchases.length > 1) {
      throw new BadUserInputError(
        "We currently only support redeeming transactions with 1 purchase."
      );
    }

    const product: Product = await purchases[0].product;
    await fulfillProduct(product.tag, user);
    redemptionCode.redeemed = true;

    return redemptionCode.save();
  }
}
