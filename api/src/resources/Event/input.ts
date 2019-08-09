import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../User";
import { Event } from "./entity";

@InputType()
export class EventCreateInput implements Partial<Event> {
  @Field()
  public eventTitle: string;

  @Field()
  public dateCreated: Date;

  @Field()
  public dateHosted: Date;

  @Field()
  public dateExpire: Date;

  @Field((returns: void) => User)
  public creator: User;

  @Field()
  public description: string;

  @Field()
  public location: string;

  @Field()
  public flierLink: string;

  @Field()
  public eventLink: string;
}

@InputType()
export class EventUpdateInput implements Partial<Event> {
  @Field({ nullable: true })
  public eventTitle: string;
}

@ObjectType()
export class EventDeleteInput implements Partial<Event> {
  @Field({ nullable: true })
  public eventTitle: string;
}
