import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @Field((returns: void) => [User])
  @ManyToMany((type: void) => User, (user: User) => user.sigs, { lazy: true })
  public users: Lazy<User[]>;

  @Field((returns: void) => [Event])
  @ManyToMany((type: void) => Event, (event: Event) => event.hostSigs, {
    lazy: true
  })
  public hostedEvents: Lazy<Event[]>;
}
