import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Lazy } from "../../lib/helpers";
import { Group } from "../Group";
import { User } from "../User";

@ObjectType()
@Entity()
export class Permission extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  public name: string;

  @ManyToMany(() => Group, (group: Group) => group.permissions, {
    lazy: true
  })
  public groups: Lazy<Group[]>;

  @Field(() => [User])
  @ManyToMany(() => User, (user: User) => user.permissions, {
    lazy: true
  })
  public users: Lazy<User[]>;
}
