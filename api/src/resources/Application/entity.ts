import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";

import { User } from "../User";

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

  @Column()
  @Generated("uuid")
  public token: string;

  @ManyToOne((type: void) => User, (user: User) => user.applications)
  public user: User;
}
