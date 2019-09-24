import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";
import { Application } from "../Application";
import { Event } from "../Event";
import { Group } from "../Group";
import { Permission } from "../Permission";
import { Resume } from "../Resume";
import { Sig } from "../Sig";
import { Transaction } from "../Transaction";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Index({ unique: true })
  @Column()
  public sub: string;

  @Field({ nullable: true })
  @Column({
    length: 50,
    nullable: true
  })
  public firstName?: string;

  @Field({ nullable: true })
  @Column({
    length: 50,
    nullable: true
  })
  public lastName?: string;

  @Field()
  @Column({
    unique: true
  })
  public email: string;

  @Field()
  @Column()
  public emailVerified: boolean;

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

  @Field((returns: void) => Resume, { nullable: true })
  @OneToOne((returns: void) => Resume, (resume: Resume) => resume.user, {
    cascade: true,
    lazy: true,
    onDelete: "SET NULL"
  })
  @JoinColumn()
  public resume: Lazy<Resume>;

  @Field((returns: void) => [Permission])
  @JoinTable()
  @ManyToMany(
    (returns: void) => Permission,
    (permission: Permission) => permission.users,
    { lazy: true }
  )
  public permissions: Lazy<Permission[]>;

  @OneToMany((returns: void) => Group, (group: Group) => group.users, {
    lazy: true
  })
  @JoinTable()
  public groups: Lazy<Group[]>;

  @OneToMany(
    (returns: void) => Application,
    (application: Application) => application.user,
    {
      lazy: true
    }
  )
  @JoinTable()
  public applications: Lazy<Application[]>;

  @OneToMany(
    (returns: void) => Transaction,
    (transaction: Transaction) => transaction.user,
    {
      lazy: true
    }
  )
  @JoinTable()
  public transactions: Lazy<Transaction[]>;

  @ManyToMany((returns: void) => Sig, (sig: Sig) => sig.users, {
    lazy: true,
    nullable: true
  })
  @JoinTable()
  public sigs: Lazy<Sig[]>;

  @OneToMany((returns: void) => Event, (event: Event) => event.creator, {
    lazy: true
  })
  @JoinTable()
  public createdEvents: Lazy<Event[]>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public graduationDate?: Date;
}
