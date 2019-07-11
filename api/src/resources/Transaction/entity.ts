import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Product } from "../Product";
import { User } from "../User";

export enum TransactionStatus {
  STARTED = "started",
  SUCCESS = "success",
  ERROR = "error"
}

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @CreateDateColumn()
  public dateCreated: Date;

  @Field()
  @Column()
  public intent: string;

  @Field()
  @Column({
    default: TransactionStatus.STARTED,
    enum: TransactionStatus,
    type: "enum"
  })
  public status: string;

  @Field((returns: void) => User)
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
