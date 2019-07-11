import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn
} from "typeorm";

import { Field, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { ProductCategory } from "../ProductCategory";
import { Transaction } from "../Transaction";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryColumn()
  public name: string;

  @Column()
  public displayName: string;

  @Column()
  public description: string;

  @Column("numeric", { nullable: true })
  public price: number;

  @OneToMany(
    (type: void) => Transaction,
    (transaction: Transaction) => transaction.product
  )
  @JoinTable()
  public transactions: Lazy<Transaction[]>;

  @ManyToMany(
    (type: void) => ProductCategory,
    (category: ProductCategory) => category.products
  )
  @JoinTable()
  public categories: Lazy<ProductCategory[]>;
}
