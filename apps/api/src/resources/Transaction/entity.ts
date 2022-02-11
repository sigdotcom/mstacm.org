import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Purchase } from "../Purchase";
import { RedemptionCode } from "../RedemptionCode";
import { User } from "../User";

export enum TransactionStatus {
  STARTED = "started",
  SUCCESS = "success",
  ERROR = "error"
}

export enum PaymentTypes {
  STRIPE = "stripe",
  REDEMPTION_CODE = "redemption-code"
}

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @CreateDateColumn()
  public dateCreated: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public intent?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public charged?: number;

  @Field()
  @Column({
    default: PaymentTypes.STRIPE,
    enum: PaymentTypes,
    type: "enum"
  })
  public paymentType: PaymentTypes;

  @Field()
  @Column({
    default: TransactionStatus.STARTED,
    enum: TransactionStatus,
    type: "enum"
  })
  public status: TransactionStatus;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.transactions, {
    lazy: true
  })
  public user: Lazy<User>;

  @Field(() => [Purchase])
  @OneToMany(() => Purchase, (purchase: Purchase) => purchase.transaction, {
    lazy: true
  })
  public purchases: Lazy<Purchase[]>;

  @Field(() => RedemptionCode)
  @OneToOne(
    () => RedemptionCode,
    (redemptionCode: RedemptionCode) => redemptionCode.transaction,
    { lazy: true }
  )
  public redemptionCode: Lazy<RedemptionCode>;
}
