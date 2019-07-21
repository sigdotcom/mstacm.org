import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";
import { Permission } from "../Permission";
import { User } from "../User";

@Entity()
export class Group extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @ManyToOne((type: void) => User, (user: User) => user.groups, {
    lazy: true
  })
  public users: User;

  @ManyToMany(
    (type: void) => Permission,
    (permission: Permission) => permission.groups,
    { lazy: true }
  )
  @JoinTable()
  public permissions: Lazy<Permission[]>;
}
