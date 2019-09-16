import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Transaction } from "../Transaction";

@ObjectType()
@Entity()
export class RedemptionCode extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryColumn()
  public id: string;

  @CreateDateColumn()
  public dateCreated: Date;

  @Field()
  @Column()
  public expirationDate: Date;

  @Field((returns: void) => [Transaction])
  @OneToOne(
    (returns: void) => Transaction,
    (transaction: Transaction) => transaction.redemptionCode,
    { lazy: true }
  )
  @JoinColumn()
  public transaction: Lazy<Transaction>;
}
