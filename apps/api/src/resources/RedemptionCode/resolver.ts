import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { BadUserInputError } from "../../lib/errors";
import { IContext } from "../../lib/interfaces";
import { fulfillProduct, createTransactionFromTags } from "../../lib/products";
import { mergeEntityLists } from "../../lib/entity";

import { Product } from "../Product";
import { Permission } from "../Permission";
import { Group } from "../Group";
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
  public async createRedemptionCode(
    @Arg("productTags", (_: void) => [String], { nullable: true })
    productTags?: string[],
    @Arg("permissionIds", (_: void) => [String], { nullable: true })
    permissionIds?: string[],
    @Arg("groupIds", (_: void) => [String], { nullable: true })
    groupIds?: string[]
  ): Promise<RedemptionCode> {
    if (!productTags && !permissionIds && !groupIds) {
      throw new BadUserInputError(
        "Did not specify anything to redeem in the redemption code."
      );
    }

    let transaction: Promise<Transaction> | undefined = undefined;
    if (productTags) {
      if (productTags.length > 1) {
        throw new BadUserInputError(
          "We currently only support redemption codes that have 1 product tag."
        );
      }

      transaction = createTransactionFromTags(productTags, true);
    }

    let resolvedPermissions: Permission[] | undefined = undefined;
    if (permissionIds) {
      const permissions: Permission[] = await Permission.findByIds(
        permissionIds
      );

      if (permissions.length !== permissionIds.length) {
        throw new BadUserInputError(
          "Specified permission ids are duplicated and/or do not exist in the database."
        );
      }
      resolvedPermissions = permissions;
    }

    let resolvedGroups: Group[] | undefined = undefined;
    if (groupIds) {
      const groups: Group[] = await Group.findByIds(groupIds);

      if (groups.length !== groupIds.length) {
        throw new BadUserInputError(
          "Specified group ids are duplicated and/or do not exist in the database."
        );
      }
      resolvedGroups = groups;
    }

    // Redemption code is not tied to a user therefore anyone could technically
    // redeem this code. It my be wise in the future to allow a user to be
    // attached to a redemption code.
    const redemptionCode = RedemptionCode.create({
      expirationDate: new Date(Date.now() + FOURTEEN_DAYS_IN_MILLISECONDS),
      id: nanoid(12),
      transaction: transaction ? await transaction : undefined,
      permissions: resolvedPermissions,
      groups: resolvedGroups
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

    const transaction:
      | Transaction
      | undefined = await redemptionCode.transaction;

    if (transaction) {
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
    }

    user.permissions = mergeEntityLists<Permission>(
      await user.permissions,
      await redemptionCode.permissions
    );
    user.groups = mergeEntityLists<Group>(
      await user.groups,
      await redemptionCode.groups
    );
    await user.save();

    redemptionCode.redeemed = true;

    return redemptionCode.save();
  }
}
