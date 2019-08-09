import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";

import { DeepPartial, getRepository, Repository } from "typeorm";
import { Event } from "./entity";
import { EventCreateInput } from "./input";

@Resolver((returns: void) => Event)
export class EventResolver {
  public repository: Repository<Event> = getRepository(Event);

  @Authorized("SUPERADMIN")
  @Mutation((returns: void) => Event)
  public async createEvent(
    @Arg("data", (argType: void) => EventCreateInput)
    input: DeepPartial<Event>
  ): Promise<Event> {
    const newResource = this.repository.create({ ...input });

    return newResource.save();
  }

  @Authorized("SUPERADMIN")
  @Query((returns: void) => [Event])
  protected async events(): Promise<Event[]> {
    return this.repository.find();
  }
}
