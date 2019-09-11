import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { ProductCategory } from "../ProductCategory";
import { Purchase } from "../Purchase";

class ColumnNumericTransformer {
  public to(data: number): number {
    return data;
  }
  public from(data: string): number {
    return parseFloat(data);
  }
}

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryColumn()
  public tag: string;

  @Field()
  @Column()
  public displayName: string;

  @Field()
  @Column()
  public description: string;

  // Must be between 5 and 22 characters
  @Field({ nullable: true })
  @Column({ nullable: true, length: 22 })
  public statementDescriptor?: string;

  @Field()
  @Column("numeric", {
    default: 0,
    scale: 2,
    transformer: new ColumnNumericTransformer()
  })
  public price: number;

  @OneToMany((type: void) => Purchase, (purchase: Purchase) => purchase.product)
  public purchases: Lazy<Purchase[]>;

  @ManyToMany(
    (type: void) => ProductCategory,
    (category: ProductCategory) => category.products
  )
  @JoinTable()
  public categories: Lazy<ProductCategory[]>;
}
