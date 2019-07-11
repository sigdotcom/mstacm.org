import { Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Transaction } from "./entity";

import { stripe } from "../../lib/stripe";

import { getConnection, Repository } from "typeorm";

@Resolver((of: void) => Transaction)
export class ProductResolver {
  private repository: Repository<Transaction> = getConnection().getRepository(
    Transaction
  );

  @Authorized("SUPERADMIN")
  @Query((returns: void) => [Transaction])
  public async transactions(): Promise<Transaction[]> {
    return this.repository.find();
  }

  @Authorized("SUPERADMIN")
  @Mutation((returns: void) => Transaction)
  public async startPayment(): Promise<Transaction> {
    const intent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      payment_method_types: ["card"]
    });

    const transaction = await this.repository.create({
      intent: intent.id
    });

    return transaction.save();
  }
}
