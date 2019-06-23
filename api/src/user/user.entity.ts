import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { Lazy } from "../helpers";

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Field()
  @Column({
    length: 50
  })
  public firstName: string;

  @Field()
  @Column({
    length: 50
  })
  public lastName: string;

  @Field()
  @Column({
    unique: true
  })
  public email: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  public isSuperAdmin: boolean;

  @Field()
  @CreateDateColumn()
  public readonly dateJoined: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public membershipExpiration: Date;

  @Field({ defaultValue: true })
  @Column({ default: true })
  public isActive: boolean;

  // @OneToMany(type => Recipe, recipe => recipe.author, { lazy: true })
  // @Field(type => [Recipe])
  // public recipes: Lazy<Recipe[]>;
}
