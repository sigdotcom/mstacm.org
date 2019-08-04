import { Field, InputType } from "type-graphql";
import { ProductNames } from "../Product";
import { Purchase } from "./entity";

@InputType()
export class PurchaseInput implements Partial<Purchase> {
  @Field()
  public quantity: number;

  @Field((returns: void) => ProductNames)
  public productName: ProductNames;
}
