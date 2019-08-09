import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Sig } from "../Sig";
import { User } from "../User";

@ObjectType()
@Entity()
export class Event extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @CreateDateColumn()
  public dateCreated: Date;

  @Field()
  @Column()
  public dateHosted: Date;

  @Field()
  @Column()
  public dateExpire: Date;

  @Field((returns: void) => User)
  @ManyToOne((type: void) => User, (user: User) => user.createdEvents, {
    lazy: true,
    nullable: false
  })
  @JoinColumn()
  public creator: Lazy<User>;

  // @Field((returns: void) => [Sig])
  @OneToMany((type: void) => Sig, (sig: Sig) => sig.hostedEvents, {
    lazy: true
  })
  @JoinTable()
  public hostSigs: Lazy<Sig[]>;

  @Field()
  @Column({
    length: 100
  })
  public eventTitle: string;

  @Field()
  @Column({
    length: 300
  })
  public description: string;

  @Field()
  @Column({
    length: 100
  })
  public location: string;

  /*@ManyToOne(type => Product, product => product.events)
  @JoinColumn({
    nullable: true
  })
  public product: Product;*/

  @Field({ nullable: true })
  @Column({
    length: 100,
    nullable: true
  })
  public flierLink: string;

  @Field({ nullable: true })
  @Column({
    length: 100,
    nullable: true
  })
  public eventLink: string;
}
