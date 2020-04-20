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
  @Field(() => ID)
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

  @Field()
  @Column({ default: "https://www.gravatar.com/avatar/?d=identicon&s=140" })
  public profilePictureUrl: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public graduationDate?: Date;

  @Field({ defaultValue: false })
  @Column({ default: false })
  public shirtReceived: boolean;

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

  @Field(() => Resume, { nullable: true })
  @OneToOne(() => Resume, (resume: Resume) => resume.user, {
    cascade: true,
    lazy: true,
    onDelete: "SET NULL"
  })
  @JoinColumn()
  public resume: Lazy<Resume>;

  @Field(() => [Permission], { nullable: true })
  @JoinTable()
  @ManyToMany(() => Permission, (permission: Permission) => permission.users, {
    lazy: true
  })
  public permissions: Lazy<Permission[]>;

  @Field((_: void) => [Group])
  @ManyToMany(() => Group, (group: Group) => group.users, {
    lazy: true
  })
  @JoinTable()
  public groups: Lazy<Group[]>;

  @OneToMany(
    () => Application,
    (application: Application) => application.user,
    {
      lazy: true
    }
  )
  @JoinTable()
  public applications: Lazy<Application[]>;

  @OneToMany(
    () => Transaction,
    (transaction: Transaction) => transaction.user,
    {
      lazy: true
    }
  )
  @JoinTable()
  public transactions: Lazy<Transaction[]>;

  @ManyToMany(() => Sig, (sig: Sig) => sig.users, {
    lazy: true,
    nullable: true
  })
  @JoinTable()
  public sigs: Lazy<Sig[]>;

  @OneToMany(() => Event, (event: Event) => event.creator, {
    lazy: true
  })
  @JoinTable()
  public createdEvents: Lazy<Event[]>;

  @ManyToMany(() => Event, (event: Event) => event.attendees, {
    lazy: true,
    nullable: true
  })
  @JoinTable()
  public eventsAttended: Lazy<Event[]>;
}
