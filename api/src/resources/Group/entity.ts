import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { Lazy } from "../../lib/helpers";

import { Permission } from "../Permission";
import { User } from "../User";
import { RedemptionCode } from "../RedemptionCode";

@ObjectType()
@Entity()
export class Group extends BaseEntity {
  @Field()
  @PrimaryColumn()
  public name: string;

  @Field((_: void) => [User])
  @ManyToMany((_: void) => User, (user: User) => user.groups, {
    lazy: true
  })
  public users: Lazy<User[]>;

  @Field((_: void) => [Permission])
  @ManyToMany(
    (_: void) => Permission,
    (permission: Permission) => permission.groups,
    { lazy: true }
  )
  @JoinTable()
  public permissions: Lazy<Permission[]>;

  @Field((returns: void) => [RedemptionCode])
  @ManyToMany(
    (type: void) => RedemptionCode,
    (redemptionCode: RedemptionCode) => redemptionCode.groups,
    {
      lazy: true
    }
  )
  public redemptionCodes: Lazy<RedemptionCode[]>;
}
