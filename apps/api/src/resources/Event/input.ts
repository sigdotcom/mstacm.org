import { Field, InputType, ObjectType } from "type-graphql";
import { Event } from "./entity";
import { Readable } from "stream";

@InputType()
export class EventCreateInput /*implements Partial<Event> */ {
  @Field()
  public eventTitle: string;

  @Field()
  public dateHosted: Date;

  @Field()
  public dateExpire: Date;

  @Field()
  public description: string;

  @Field()
  public location: string;

  @Field({ nullable: true })
  public flierLink: string;

  @Field({ nullable: true })
  public eventLink: string;

  @Field()
  public hostCommunity: string;
}

@InputType()
export class EventUpdateInput /*implements Partial<Event> */ {
  @Field({ nullable: true })
  public eventTitle: string;

  @Field({ nullable: true })
  public dateHosted: Date;

  @Field({ nullable: true })
  public dateExpire: Date;

  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public location: string;

  @Field({ nullable: true })
  public flierLink: string;

  @Field({ nullable: true })
  public eventLink: string;

  @Field()
  public hostCommunity: string;
}

@ObjectType()
export class EventDeletePayload implements Partial<Event> {
  @Field({ nullable: true })
  public id: number;
}

export class File {
  @Field(() => Readable)
  public createReadStream: () => Readable;

  @Field()
  public filename: string;

  @Field()
  public mimetype: string;

  @Field()
  public encoding: string;
}
