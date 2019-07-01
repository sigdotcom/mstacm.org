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
export class Transaction extends BaseEntity {
  @PrimaryColumn()
  public id: string;

  @CreateDateColumn()
  public dateCreated: Date;

  @ManyToOne((type: void) => User, (user: User) => user.transactions, {
    lazy: true
  })
  public user: Lazy<User>;

  @ManyToOne(
    (type: void) => Product,
    (product: Product) => product.transactions,
    { lazy: true }
  )
  public product: Lazy<Product>;
}
