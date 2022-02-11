import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "./entity";

@InputType()
export class UserCreateInput implements Partial<User> {
  @Field()
  public firstName: string;

  @Field()
  public lastName: string;

  @Field()
  public email: string;

  @Field()
  public sub: string;
}

@InputType()
export class UserUpdateInput implements Partial<User> {
  @Field({ nullable: true })
  public firstName?: string;

  @Field({ nullable: true })
  public lastName?: string;

  @Field({ nullable: true })
  public email?: string;
}

@ObjectType()
export class UserDeletePayload implements Partial<User> {
  @Field({ nullable: true })
  public firstName: string;
}
