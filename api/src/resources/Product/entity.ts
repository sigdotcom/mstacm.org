import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { ProductCategory } from "../ProductCategory";
import { Transaction } from "../Transaction";

export enum ProductNames {
  SEMESTER_MEMBERSHIP = "semester_membership",
  YEAR_MEMBERSHIP = "year_membership"
}

registerEnumType(ProductNames, {
  description: "All possible products.",
  name: "ProductNames"
});

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Index({ unique: true })
  @Column({
    enum: ProductNames,
    type: "enum"
  })
  public name: ProductNames;

  @Column()
  public displayName: string;

  @Column()
  public description: string;

  @Column("numeric", { default: 0 })
  public price: number;

  @ManyToMany(
    (type: void) => Transaction,
    (transaction: Transaction) => transaction.products
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
