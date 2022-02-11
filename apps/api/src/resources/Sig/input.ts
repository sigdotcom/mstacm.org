import { Field, InputType, ObjectType } from "type-graphql";
import { Sig } from "./entity";

@InputType()
export class SigCreateInput implements Partial<Sig> {
  @Field()
  public name: string;

  @Field()
  public description: string;
}

@InputType()
export class SigUpdateInput implements Partial<Sig> {
  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public description?: string;
}

@ObjectType()
export class SigDeletePayload implements Partial<Sig> {
  @Field({ nullable: true })
  public name: string;
}
