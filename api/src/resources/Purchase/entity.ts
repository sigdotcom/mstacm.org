import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Product } from "../Product";
import { Transaction } from "../Transaction";

@ObjectType()
@Entity()
export class Purchase extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryGeneratedColumn()
  public id: string;

  @Field()
  @Column()
  public quantity: number;

  @Field((returns: void) => Product)
  @ManyToOne((type: void) => Product, (product: Product) => product.purchases, {
    lazy: true
  })
  public product: Lazy<Product>;

  @Field((returns: void) => [Transaction])
  @ManyToOne(
    (type: void) => Transaction,
    (transaction: Transaction) => transaction.purchases,
    {
      lazy: true
    }
  )
  public transaction: Lazy<Transaction>;
}
