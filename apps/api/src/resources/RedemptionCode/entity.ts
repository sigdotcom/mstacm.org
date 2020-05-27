import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Permission } from "../Permission";
import { Group } from "../Group";
import { Transaction } from "../Transaction";

@ObjectType()
@Entity()
export class RedemptionCode extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  public id: string;

  @CreateDateColumn()
  public dateCreated: Date;

  @Field({ defaultValue: false })
  @Column({ default: false })
  public redeemed: boolean;

  @Field()
  @Column()
  public expirationDate: Date;

  @Field(() => Transaction, { nullable: true })
  @OneToOne(
    () => Transaction,
    (transaction: Transaction) => transaction.redemptionCode,
    { lazy: true }
  )
  @JoinColumn()
  public transaction: Lazy<Transaction>;

  @Field((_: void) => [Permission])
  @ManyToMany(
    (_: void) => Permission,
    (permission: Permission) => permission.redemptionCodes,
    { lazy: true }
  )
  @JoinTable()
  public permissions: Lazy<Permission[]>;

  @Field((_: void) => [Group])
  @ManyToMany(
    (_: void) => Group,
    (group: Group) => group.redemptionCodes,
    {
      lazy: true,
    }
  )
  @JoinTable()
  public groups: Lazy<Group[]>;
}
