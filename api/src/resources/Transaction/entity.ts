import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Purchase } from "../Purchase";
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
  @Column({ nullable: true })
  public charged?: number;

  @Field()
  @Column({
    default: TransactionStatus.STARTED,
    enum: TransactionStatus,
    type: "enum"
  })
  public status: TransactionStatus;

  @Field((returns: void) => User)
  @ManyToOne((type: void) => User, (user: User) => user.transactions, {
    lazy: true
  })
  public user: Lazy<User>;

  @Field((returns: void) => [Purchase])
  @OneToMany(
    (type: void) => Purchase,
    (purchase: Purchase) => purchase.transaction,
    { lazy: true }
  )
  public purchases: Lazy<Purchase[]>;
}
