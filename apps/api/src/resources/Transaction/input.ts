import { Field, ObjectType } from "type-graphql";
import { Transaction } from "./entity";

@ObjectType()
export class TransactionPayload implements Partial<Transaction> {
  @Field()
  public id: string;

  @Field({ nullable: true })
  public charged?: number;

  @Field()
  public clientSecret: string;
}
