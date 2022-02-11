import { Field, InputType, ObjectType } from "type-graphql";
import { Permission } from "./entity";

@InputType()
export class PermissionCreateInput implements Partial<Permission> {
  @Field()
  public name: string;
}

@InputType()
export class PermissionUpdateInput implements Partial<Permission> {
  @Field({ nullable: true })
  public name?: string;
}

@ObjectType()
export class PermissionDeletePayload implements Partial<Permission> {
  @Field({ nullable: true })
  public name: string;
}
