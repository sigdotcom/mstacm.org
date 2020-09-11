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
  
  @Field({nullable: true})
  @Column({nullable: true})
  public topic: string; //shorthand version of the original name

  @Field()
  @CreateDateColumn({
    readonly: true
  })
  public dateFounded: Date;

  @Field()
  @Column()
  public description: string;

  @Field({nullable: true})
  @Column({nullable: true})
  public website: string;

  @Field({nullable: true})
  @Column({nullable: true})
  public email: string;

  @Field({nullable: true})
  @Column({nullable: true})
  public discordLink: string;

  @Field({nullable: true})
  @Column({nullable: true})
  public color: string;

  @Field({nullable: true})
  @Column({nullable: true})
  public logoLink: string;

  @Field({nullable: true})
  @Column({nullable: true})
  public logoLinkDark: string;

  @Field({nullable: true})
  @Column({default: true})
  public display: boolean;

  @Field(() => [User])
  @ManyToMany(() => User, (user: User) => user.sigs, { lazy: true })
  public users: Lazy<User[]>;

  @Field(() => [Event])
  @OneToMany(() => Event, (event: Event) => event.hostSig, {
    lazy: true
  })
  public hostedEvents: Lazy<Event[]>;
}
