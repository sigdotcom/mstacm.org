import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from "typeorm";

import { Lazy } from "../../lib/helpers";
import { Event } from "../Event";
import { User } from "../User";

@Entity()
export class Sig extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @CreateDateColumn()
  public dateFounded: Date;

  @Column()
  public description: string;

  @ManyToMany((type: void) => User, (user: User) => user.sigs, { lazy: true })
  public users: Lazy<User[]>;

  @ManyToOne((type: void) => Event, (event: Event) => event.hostSigs, {
    lazy: true
  })
  public hostedEvents: Lazy<Event[]>;
}
