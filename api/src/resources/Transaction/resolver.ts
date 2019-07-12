import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Product, ProductNames } from "../Product";
import { Transaction } from "./entity";

import { stripe } from "../../lib/stripe";

import { getConnection, Repository } from "typeorm";

@Resolver((of: void) => Transaction)
export class ProductResolver {
  private transactionRepo: Repository<
    Transaction
  > = getConnection().getRepository(Transaction);

  private productRepo: Repository<Product> = getConnection().getRepository(
    Product
  );

  @Authorized("SUPERADMIN")
  @Query((returns: void) => [Transaction])
  public async transactions(): Promise<Transaction[]> {
    return this.transactionRepo.find();
  }

  @Authorized("SUPERADMIN")
  @Mutation((returns: void) => Transaction)
  public async startPayment(
    @Arg("productNames", (type: void) => [ProductNames])
    productNames: ProductNames[]
  ): Promise<Transaction> {
    const products = [];
    for (const productName of productNames) {
      products.push(
        await this.productRepo.findOneOrFail({ name: productName })
      );
    }

    // Why is this returning a string?
    const prices: number[] = products.map(
      (product: Product) => product.price as number
    );
    const totalCost: number = prices.reduce(
      (acc: number, price: number) => acc + price,
      0
    );

    const normalizedTotalCost: number = totalCost * 100;
    console.log(normalizedTotalCost);

    const intent = await stripe.paymentIntents.create({
      amount: normalizedTotalCost,
      currency: "usd",
      payment_method_types: ["card"]
    });

    const transaction = await this.transactionRepo.create({
      intent: intent.id,
      products
    });

    return transaction.save();
  }
}
