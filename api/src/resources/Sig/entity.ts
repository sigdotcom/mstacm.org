import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn
} from "typeorm";

import { Lazy } from "../../lib/helpers";
import { Event } from "../Event";
import { User } from "../User";

@ObjectType()
@Entity()
export class Sig extends BaseEntity {
  @Field()
  @PrimaryColumn()
  public name: string;

  @Field()
  @CreateDateColumn({
    readonly: true
  })
  public dateFounded: Date;

  @Field()
  @Column()
  public description: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user: User) => user.sigs, { lazy: true })
  public users: Lazy<User[]>;

  @Field(() => [Event])
  @OneToMany(() => Event, (event: Event) => event.hostSig, {
    lazy: true
  })
  public hostedEvents: Lazy<Event[]>;
}
