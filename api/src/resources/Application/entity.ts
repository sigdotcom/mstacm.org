import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
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
