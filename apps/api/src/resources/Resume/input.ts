import { Readable } from "stream";
import { Field } from "type-graphql";

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
