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
@Resolver(() => Event)
export class EventResolver {
  public repository: Repository<Event> = getRepository(Event);

  public sigRepository: Repository<Sig> = getRepository(Sig);

  @Authorized("delete:events")
  @Mutation(() => EventDeletePayload)
  public async deleteEvent(
    @Arg("id", () => Number) id: number
  ): Promise<INumber> {
    await this.repository.delete(id);

    return { id };
  }

  @Authorized("update:events")
  @Mutation(() => Event)
  public async updateEvent(
    @Arg("id", () => Number) id: number,
    @Arg("data", () => EventUpdateInput)
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
  @Mutation(() => Event)
  public async createEvent(
    @Ctx() context: IContext,
    @Arg("data", () => EventCreateInput)
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

  @Query(() => [Event])
  protected async events(): Promise<Event[]> {
    return this.repository.find();
  }

  @Query(() => [Event])
  protected async currentEvents(): Promise<Event[]> {
    return this.repository.find({
      where: {
        dateExpire: MoreThanOrEqual("NOW()")
      }
    });
  }

  @Query(() => Event)
  protected async event(@Arg("id", () => Number) id: number): Promise<Event> {
    return this.repository.findOneOrFail({ id });
  }
}
