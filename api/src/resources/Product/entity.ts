import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { ProductCategory } from "../ProductCategory";
import { Purchase } from "../Purchase";

export enum ProductNames {
  SEMESTER_MEMBERSHIP = "semester_membership",
  YEAR_MEMBERSHIP = "year_membership"
}

registerEnumType(ProductNames, {
  description: "All possible products.",
  name: "ProductNames"
});

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
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Field((returns: void) => ProductNames)
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
