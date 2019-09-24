import { paymentIntents } from "stripe";
import { Field, ObjectType, registerEnumType } from "type-graphql";

import { Product } from "../resources/Product";
import { Purchase } from "../resources/Purchase";
import { Transaction } from "../resources/Transaction";
import { User } from "../resources/User";

import { BadUserInputError } from "./errors";
import { stripe } from "./stripe";

// WARNING: be very careful about editting this file
// as it is tied directly to the initial_values migration.
// DO NOT edit this file unless you know what you're doing.

export const YEARLY_MEMBERSHIP = {
  tag: "yearly-membership"
};

export const SEMESTERLY_MEMBERSHIP = {
  tag: "semesterly-membership"
};

// Computed types are not liked by enums for some reason
// investigate later
export enum MembershipTypes {
  YEARLY = "yearly-membership",
  SEMESTERLY = "semesterly-membership"
}

const addDates: any = {
  [MembershipTypes.SEMESTERLY]: 6,
  [MembershipTypes.YEARLY]: 12
};

registerEnumType(MembershipTypes, {
  name: "MembershipTypes", // this one is mandatory
  description: "Different types of ACM memberships one can have." // this one is optional
});

@ObjectType()
export class MembershipProduct {
  @Field((returns: void) => MembershipTypes)
  public tag: MembershipTypes;
}

export interface IPurchase {
  transaction: Transaction;
  intent: paymentIntents.IPaymentIntent;
}

export const purchaseSingleProduct = async (
  product: Product,
  quantity: number,
  user: User
): Promise<IPurchase> => {
  const reqProductPurchase = await Purchase.create({
    product,
    quantity
  });
  await reqProductPurchase.save();

  // Charge the customer from stripe (stripe only allows cents) and store
  // the transaction in our database for lookup later.
  const normalizedCost = product.price * 100 * quantity;
  const intent = await stripe.paymentIntents.create({
    amount: normalizedCost,
    currency: "usd",
    description: product.displayName,
    metadata: {
      email: user.email,
      productTag: product.tag,
      userId: user.id
    },
    payment_method_types: ["card"],
    receipt_email: user.email,
    statement_descriptor: `ACM* ${product.statementDescriptor}`
  });

  const newTransaction: Transaction = await Transaction.create({
    charged: normalizedCost,
    intent: intent.id,
    purchases: [reqProductPurchase],
    user
  });

  const savedTransaction: Transaction = await newTransaction.save();

  return Promise.resolve({ transaction: savedTransaction, intent });
};

export const fulfillProduct = async (productTag: string, user: User) => {
  const curDate: Date = new Date();

  if (productTag in addDates) {
    let newMonth: number = curDate.getMonth() + addDates[productTag];

    const normalizedMonth: number = (newMonth % 12) + 1;

    if (normalizedMonth > 5 && normalizedMonth < 8) {
      newMonth += 8 - normalizedMonth;
    }

    user.membershipExpiration = new Date(curDate.setMonth(newMonth));
    await user.save();
  } else {
    throw new BadUserInputError(
      "We currently only support fulfilling ACM membership"
    );
  }
};
