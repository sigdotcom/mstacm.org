import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { Product } from "../Product";
import { Purchase } from "../Purchase";
import { PurchaseInput } from "../Purchase/input";
import { User } from "../User";
import { Transaction } from "./entity";
import { TransactionPayload } from "./input";

import { IContext } from "../../lib/interfaces";
import { stripe } from "../../lib/stripe";

import { getConnection, Repository } from "typeorm";

@Resolver((of: void) => Transaction)
export class ProductResolver {
  public transactionRepo: Repository<
    Transaction
  > = getConnection().getRepository(Transaction);

  private productRepo: Repository<Product> = getConnection().getRepository(
    Product
  );

  private purchaseRepo: Repository<Purchase> = getConnection().getRepository(
    Purchase
  );

  @Authorized("SUPERADMIN")
  @Query((returns: void) => [Transaction])
  public async transactions(): Promise<Transaction[]> {
    return this.transactionRepo.find();
  }

  @Authorized()
  @Mutation((returns: void) => TransactionPayload)
  public async startTransaction(
    @Ctx() context: IContext,
    @Arg("purchase", (type: void) => PurchaseInput)
    reqPurchaseInput: PurchaseInput
  ): Promise<TransactionPayload> {
    const tag: string = reqPurchaseInput.tag;
    const quantity: number = reqPurchaseInput.quantity;
    // const user: User = context.state.user as User;
    const user: User = (await User.findOne({ email: "acm@mst.edu" }))!;

    const reqProduct: Product = await this.productRepo.findOneOrFail({
      tag
    });

    const reqProductPurchase = await this.purchaseRepo.create({
      product: reqProduct,
      quantity
    });
    await reqProductPurchase.save();

    // Charge the customer from stripe (stripe only allows cents) and store
    // the transaction in our database for lookup later.
    const normalizedCost = reqProduct.price * 100 * quantity;
    const intent = await stripe.paymentIntents.create({
      amount: normalizedCost,
      currency: "usd",
      description: reqProduct.displayName,
      metadata: {
        email: user.email,
        productTag: tag,
        userId: user.id
      },
      payment_method_types: ["card"],
      receipt_email: user.email
    });

    const newTransaction: Transaction = await this.transactionRepo.create({
      charged: normalizedCost,
      intent: intent.id,
      purchases: [reqProductPurchase]
    });

    const savedTransaction: Transaction = await newTransaction.save();

    return {
      charged: savedTransaction.charged,
      clientSecret: intent.client_secret,
      id: savedTransaction.id
    };
  }
}
