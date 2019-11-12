import { Field, InputType, ObjectType } from "type-graphql";
import { Community } from "./entity";

@InputType()
export class CommunityCreateInput implements Partial<Community> {
  @Field()
  public name: string;

  @Field()
  public description: string;
}

@InputType()
export class CommunityUpdateInput implements Partial<Community> {
  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public description?: string;
}

@ObjectType()
export class CommunityDeletePayload implements Partial<Community> {
  @Field({ nullable: true })
  public name: string;
}
