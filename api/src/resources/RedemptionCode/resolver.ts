import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { BadUserInputError } from "../../lib/errors";
import { IContext } from "../../lib/interfaces";
import { fulfillProduct, MembershipTypes } from "../../lib/products";

import { Product } from "../Product";
import { Purchase } from "../Purchase";
import { PaymentTypes, Transaction } from "../Transaction";
import { User } from "../User";
import { RedemptionCode } from "./entity";

const nanoid = require("nanoid");

const FOURTEEN_DAYS_IN_MILLISECONDS: number = 12096e5;

/**
 * GraphQL Resolver for RedemptionCodes
 */
@Resolver((resolverType: void) => RedemptionCode)
export class RedemptionCodeResolver {
  @Authorized("view:redemption_codes")
  @Query((returns: void) => [RedemptionCode])
  public async redemptionCodes(): Promise<RedemptionCode[]> {
    return RedemptionCode.find();
  }

  @Authorized("create:redemption_codes")
  @Mutation((returns: void) => RedemptionCode)
  public async createMembershipRedemptionCode(
    @Ctx() context: IContext,
    @Arg("membershipType", (retuns: void) => MembershipTypes)
    membershipType: MembershipTypes
  ): Promise<RedemptionCode> {
    const tag: string = membershipType.toString();
    const quantity: number = 1;

    const membershipProduct: Product = await Product.findOneOrFail({
      tag
    });

    const membershipPurchase: Purchase = await Purchase.create({
      product: membershipProduct,
      quantity
    });
    await membershipPurchase.save();

    const transaction: Transaction = await Transaction.create({
      charged: membershipProduct.price * 100,
      paymentType: PaymentTypes.REDEMPTION_CODE,
      purchases: [membershipPurchase]
    });
    await transaction.save();

    const redemptionCode = await RedemptionCode.create({
      expirationDate: new Date(Date.now() + FOURTEEN_DAYS_IN_MILLISECONDS),
      id: nanoid(12),
      transaction
    });

    return redemptionCode.save();
  }

  @Authorized()
  @Mutation((returns: void) => RedemptionCode)
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
