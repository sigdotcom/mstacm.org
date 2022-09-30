import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

import { Lazy } from "../../lib/helpers";
import { Product } from "../Product";

@Entity()
export class ProductCategory extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @Column({ nullable: true })
  public description: string;

  @ManyToMany(() => Product, (product: Product) => product.categories, {
    lazy: true
  })
  public products: Lazy<Product[]>;
}
