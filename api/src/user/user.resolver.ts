import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Context } from "../helpers";
import { User } from "./user.entity";

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  @Query(returns => User, { nullable: true })
  public user(@Arg("id", type => Int) id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  @Query(returns => [User])
  public users(): Promise<User[]> {
    return this.repository.find();
  }
}
