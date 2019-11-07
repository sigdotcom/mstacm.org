import { Field, InputType, Int } from "type-graphql";
import { Purchase } from "./entity";

@InputType()
export class PurchaseInput implements Partial<Purchase> {
  @Field(() => Int, { defaultValue: 1 })
  public quantity: number;

  @Field()
  public tag: string;
}
