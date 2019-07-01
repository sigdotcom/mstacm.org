import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";
import { Application } from "../Application";
import { Group } from "../Group";
import { Permission } from "../Permission";
import { Sig } from "../Sig";
import { Transaction } from "../Transaction";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((type: void) => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Index({ unique: true })
  @Column()
  public googleSub: string;

  @Field()
  @Column({
    length: 50
  })
  public firstName: string;

  @Field()
  @Column({
    length: 50
  })
  public lastName: string;

  @Field()
  @Column({
    unique: true
  })
  public email: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  public isSuperAdmin: boolean;

  @Field()
  @CreateDateColumn()
  public readonly dateJoined: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public membershipExpiration: Date;

  @Field({ defaultValue: true })
  @Column({ default: true })
  public isActive: boolean;

  @Field((returns: void) => [Permission])
  @JoinTable()
  @ManyToMany(
    (type: void) => Permission,
    (permission: Permission) => permission.users,
    { lazy: true }
  )
  public permissions: Lazy<Permission[]>;

  @OneToMany((type: void) => Group, (group: Group) => group.users, {
    lazy: true
  })
  @JoinTable()
  public groups: Lazy<Group[]>;

  @OneToMany(
    (type: void) => Application,
    (application: Application) => application.user,
    {
      lazy: true
    }
  )
  @JoinTable()
  public applications: Lazy<Application[]>;

  @OneToMany(
    (type: void) => Transaction,
    (transaction: Transaction) => transaction.user,
    {
      lazy: true
    }
  )
  @JoinTable()
  public transactions: Lazy<Transaction[]>;

  @ManyToMany((type: void) => Sig, (sig: Sig) => sig.users, { lazy: true })
  @JoinTable()
  public sigs: Lazy<Sig[]>;
}