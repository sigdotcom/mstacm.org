import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from "typeorm";

import { Lazy } from "../../lib/helpers";
import { Product } from "../Product";
import { User } from "../User";

@Entity()
export class ProductCategory extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @Column({ nullable: true })
  public description: string;

  @ManyToMany(
    (type: void) => Product,
    (product: Product) => product.categories,
    { lazy: true }
  )
  public products: Lazy<Product[]>;
}
