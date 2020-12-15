import { Field, InputType, ObjectType } from "type-graphql";
import { Sig } from "./entity";

@InputType()
export class SigCreateInput implements Partial<Sig> {
  @Field()
  public name: string;

  @Field({ nullable: true })
  public topic?: string;

  @Field()
  public description: string;

  @Field({nullable: true})
  public website?: string;

  @Field({nullable: true})
  public email?: string;

  @Field({nullable: true})
  public discordLink?: string;

  @Field({nullable: true})
  public color?: string;

  @Field({nullable: true})
  public logoLink?: string;

  @Field({nullable: true})
  public logoLinkDark?: string;

  @Field({nullable: true})
  public display?: boolean;
}

@InputType()
export class SigUpdateInput implements Partial<Sig> {
  @Field({ nullable: true })
  public name?: string;
  
  @Field({ nullable: true })
  public topic?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({nullable: true})
  public website?: string;

  @Field({nullable: true})
  public email?: string;

  @Field({nullable: true})
  public discordLink?: string;

  @Field({nullable: true})
  public color?: string;

  @Field({nullable: true})
  public logoLink?: string;

  @Field({nullable: true})
  public logoLinkDark?: string;

  @Field({nullable: true})
  public display?: boolean;
}

@ObjectType()
export class SigDeletePayload implements Partial<Sig> {
  @Field({ nullable: true })
  public name: string;
}
