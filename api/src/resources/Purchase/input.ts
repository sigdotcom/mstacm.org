import { Field, InputType } from "type-graphql";
import { Purchase } from "./entity";

@InputType()
export class PurchaseInput implements Partial<Purchase> {
  @Field()
  public quantity: number;

  @Field()
  public tag: string;
}
