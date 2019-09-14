import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { DeepPartial, getRepository, Repository } from "typeorm";
import { IContext } from "../../lib/interfaces";
import { Sig } from "../Sig";
import { Event } from "./entity";
import {
  EventCreateInput,
  EventDeletePayload,
  EventUpdateInput
} from "./input";

interface INumber {
  id: number;
}

@Resolver((returns: void) => Event)
export class EventResolver {
  public repository: Repository<Event> = getRepository(Event);
  public sigRepository: Repository<Sig> = getRepository(Sig);

  @Authorized("SUPERADMIN")
  @Mutation((returns: void) => EventDeletePayload)
  public async deleteEvent(
    @Arg("id", (argType: void) => Number) id: number
  ): Promise<INumber> {
    await this.repository.delete(id);

    return { id };
  }

  @Authorized("SUPERADMIN")
  @Mutation((returns: void) => Event)
  public async updateEvent(
    @Ctx() context: IContext,
    @Arg("id", (argType: void) => Number) id: number,
    @Arg("data", (argType: void) => EventUpdateInput)
    input: DeepPartial<Event>
  ): Promise<Event> {
    if (input.hostSig) {
      const hostSig = await this.sigRepository.findOneOrFail({
        name: String(input.hostSig)
      });
      input.hostSig = hostSig;
    }

    const event = await this.repository.findOneOrFail(id);
    const updatedResource = this.repository.merge(event, { ...input });

    return updatedResource.save();
  }

  @Authorized("SUPERADMIN")
  @Mutation((returns: void) => Event)
  public async createEvent(
    @Ctx() context: IContext,
    @Arg("data", (argType: void) => EventCreateInput)
    input: DeepPartial<Event>
  ): Promise<Event> {
    const creator = context.state.user;
    const hostSig = await this.sigRepository.findOneOrFail({
      name: String(input.hostSig)
    });
    input.hostSig = hostSig;
    const newResource = this.repository.create({ ...input, creator });

    return newResource.save();
  }

  @Authorized("SUPERADMIN")
  @Query((returns: void) => [Event])
  protected async events(): Promise<Event[]> {
    return this.repository.find();
  }

  @Authorized("SUPERADMIN")
  @Query((returns: void) => Event)
  protected async event(
    @Arg("id", (argType: void) => Number) id: number
  ): Promise<Event> {
    return this.repository.findOneOrFail({ id });
  }
}
