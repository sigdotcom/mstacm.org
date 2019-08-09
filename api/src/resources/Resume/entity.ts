import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";
import { User } from "../User";

@ObjectType()
@Entity()
export class Resume extends BaseEntity {
  @Field((returns: void) => ID)
  @Index({ unique: true })
  @PrimaryColumn()
  public id: string;

  @Field()
  @Column()
  public url: string;

  @Field()
  @CreateDateColumn()
  public readonly added: Date;

  @Field((returns: void) => User, { nullable: true })
  @OneToOne((type: void) => User, (user: User) => user.resume, {
    lazy: true,
    onDelete: "SET NULL"
  })
  public user: Lazy<User>;
}
