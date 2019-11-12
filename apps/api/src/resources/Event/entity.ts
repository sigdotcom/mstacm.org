import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Community } from "../Community";
import { User } from "../User";

@ObjectType()
@Entity()
export class Event extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @CreateDateColumn({
    readonly: true
  })
  public dateCreated: Date;

  @Field()
  @Column()
  public dateHosted: Date;

  @Field()
  @Column()
  public dateExpire: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.createdEvents, {
    lazy: true,
    nullable: false
  })
  @JoinColumn()
  public creator: Lazy<User>;

  @Field(() => Community)
  @ManyToOne(
    () => Community,
    (community: Community) => community.hostedEvents,
    {
      lazy: true,
      nullable: false
    }
  )
  @JoinTable()
  public hostCommunity: Lazy<Community>;

  @Field()
  @Column()
  public eventTitle: string;

  @Field()
  @Column()
  public description: string;

  @Field()
  @Column()
  public location: string;

  /*@ManyToOne(type => Product, product => product.events)
  @JoinColumn({
    nullable: true
  })
  public product: Product;*/

  @Field({ nullable: true })
  @Column({
    nullable: true
  })
  public flierLink?: string;

  @Field({ nullable: true })
  @Column({
    nullable: true
  })
  public eventLink?: string;
}
