import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { Product } from "../Product";
import { PurchaseInput } from "../Purchase/input";
import { User } from "../User";
import { Transaction } from "./entity";
import { TransactionPayload } from "./input";

import { IContext } from "../../lib/interfaces";
import {
  IPurchase,
  MembershipTypes,
  purchaseSingleProduct
} from "../../lib/products";

import { getConnection, Repository } from "typeorm";

@Resolver((of: void) => Transaction)
export class ProductResolver {
  public transactionRepo: Repository<
    Transaction
  > = getConnection().getRepository(Transaction);

  private productRepo: Repository<Product> = getConnection().getRepository(
    Product
  );

  @Authorized("view:transactions")
  @Query((returns: void) => [Transaction])
  public async transactions(): Promise<Transaction[]> {
    return this.transactionRepo.find();
  }

  @Authorized()
  @Mutation((returns: void) => TransactionPayload)
  public async startMembershipTransaction(
    @Ctx() context: IContext,
    @Arg("membershipType", (retuns: void) => MembershipTypes)
    membershipType: MembershipTypes
  ): Promise<TransactionPayload> {
    const tag: string = membershipType.toString();
    const quantity: number = 1;
    const user: User = context.state.user as User;

    const reqProduct: Product = await this.productRepo.findOneOrFail({
      tag
    });

    const purchase: IPurchase = await purchaseSingleProduct(
      reqProduct,
      quantity,
      user
    );

    return {
      charged: purchase.transaction.charged,
      clientSecret: purchase.intent.client_secret,
      id: purchase.transaction.id
    };
  }

  @Authorized()
  @Mutation((returns: void) => TransactionPayload)
  public async startProductTransaction(
    @Ctx() context: IContext,
    @Arg("purchase", (returns: void) => PurchaseInput)
    reqPurchaseInput: PurchaseInput
  ): Promise<TransactionPayload> {
    const tag: string = reqPurchaseInput.tag;
    const quantity: number = reqPurchaseInput.quantity;
    const user: User = context.state.user as User;

    const reqProduct: Product = await this.productRepo.findOneOrFail({
      tag
    });

    const purchase: IPurchase = await purchaseSingleProduct(
      reqProduct,
      quantity,
      user
    );

    return {
      charged: purchase.transaction.charged,
      clientSecret: purchase.intent.client_secret,
      id: purchase.transaction.id
    };
  }
}
