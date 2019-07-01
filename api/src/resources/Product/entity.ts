import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";

import { Lazy } from "../../lib/helpers";
import { ProductCategory } from "../ProductCategory";
import { Transaction } from "../Transaction";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

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
