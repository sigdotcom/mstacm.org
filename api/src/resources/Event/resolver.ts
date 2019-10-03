import { AuthenticationError } from "apollo-server";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  DeepPartial,
  getRepository,
  MoreThanOrEqual,
  Repository
} from "typeorm";

import { IContext } from "../../lib/interfaces";
import { Sig } from "../Sig";
import { User } from "../User";
import { Event } from "./entity";
import {
  EventCreateInput,
  EventDeletePayload,
  EventUpdateInput
} from "./input";

interface INumber {
  id: number;
}

/**
 * Resolvers for viewing and modifying the Event entity
 */
@Resolver((returns: void) => Event)
export class EventResolver {
  public repository: Repository<Event> = getRepository(Event);
  public sigRepository: Repository<Sig> = getRepository(Sig);

  @Authorized("delete:events")
  @Mutation((returns: void) => EventDeletePayload)
  public async deleteEvent(
    @Arg("id", (argType: void) => Number) id: number
  ): Promise<INumber> {
    await this.repository.delete(id);

    return { id };
  }

  @Authorized("update:events")
  @Mutation((returns: void) => Event)
  public async updateEvent(
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

  @Authorized("create:events")
  @Mutation((returns: void) => Event)
  public async createEvent(
    @Ctx() context: IContext,
    @Arg("data", (argType: void) => EventCreateInput)
    input: DeepPartial<Event>
  ): Promise<Event> {
    const creator: User | undefined = context.state.user;

    if (!creator) {
      throw new AuthenticationError("Please login to access this resource.");
    }

    const hostSig: Sig = await this.sigRepository.findOneOrFail({
      name: String(input.hostSig)
    });
    input.hostSig = hostSig;
    const newResource = this.repository.create({ ...input, creator });

    return newResource.save();
  }

  @Query((returns: void) => [Event])
  protected async events(): Promise<Event[]> {
    return this.repository.find();
  }

  @Query((returns: void) => [Event])
  protected async currentEvents(): Promise<Event[]> {
    return this.repository.find({
      where: {
        dateExpire: MoreThanOrEqual("NOW()")
      }
    });
  }

  @Query((returns: void) => Event)
  protected async event(
    @Arg("id", (argType: void) => Number) id: number
  ): Promise<Event> {
    return this.repository.findOneOrFail({ id });
  }
}
