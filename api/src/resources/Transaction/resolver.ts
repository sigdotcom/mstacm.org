import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "../Product";
import { Purchase } from "../Purchase";
import { PurchaseInput } from "../Purchase/input";
import { Transaction } from "./entity";

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

  @Authorized("SUPERADMIN")
  @Mutation((returns: void) => Transaction)
  public async startTransaction(
    @Arg("purchases", (type: void) => [PurchaseInput])
    purchasesInput: PurchaseInput[]
  ): Promise<Transaction> {
    const purchases: Purchase[] = [];
    const products: any = {};
    let cost = 0;

    // For each purchase the user wants to make, create the product entity and
    // then rollup the total cost of the transaction.
    for (const purchase of purchasesInput) {
      const productTag = purchase.tag;
      const quantity = purchase.quantity;

      // Memoize the product lookup to prevent extra lookups in the database
      // This only matters in a client-side bug where the api receives two
      // products that arent in the same object. i.e. [{YEAR_MEMBERSHIP},
      // {YEAR_MEMBERSHIP}]
      if (!products.hasOwnProperty(productTag)) {
        products[productTag] = await this.productRepo.findOneOrFail({
          tag: productTag
        });
      }
      const curProduct: Product = products[productTag];
      const curPrice = curProduct.price * Math.abs(quantity);
      const curPurchase = await this.purchaseRepo.create({
        product: curProduct,
        quantity
      });
      await curPurchase.save();

      purchases.push(curPurchase);
      cost += curPrice;
    }

    // Charge the customer from stripe (stripe only allows integers) and store
    // the transaction in our database for lookup later.
    const normalizedCost = cost * 100;
    const intent = await stripe.paymentIntents.create({
      amount: normalizedCost,
      currency: "usd",
      payment_method_types: ["card"]
    });

    const transaction = await this.transactionRepo.create({
      charged: normalizedCost,
      intent: intent.id,
      purchases
    });

    return transaction.save();
  }
}
