import { AuthenticationError, UserInputError } from "apollo-server";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  DeepPartial,
  getRepository,
  MoreThanOrEqual,
  Repository
} from "typeorm";

import { GraphQLUpload } from "graphql-upload";
import * as fileType from "file-type";
import { v4 as uuid } from "uuid";
import { uploadFile } from "../../lib/files";

import { IContext } from "../../lib/interfaces";
import { Sig } from "../Sig";
import { User } from "../User";
import { Event } from "./entity";
import { File } from "./input";
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
    input: any,
    @Arg("flier", () => GraphQLUpload, { nullable: true }) flier?: File
  ): Promise<Event> {
    const creator: User | undefined = context.state.user;

    if (!creator) {
      throw new AuthenticationError("Please login to access this resource.");
    }

    if (flier) {
      const passthrough = await fileType.stream(flier.createReadStream());
      if (!passthrough.fileType || passthrough.fileType.ext !== "pdf") {
        throw new UserInputError("Error when parsing user input", {
          flier:
            "File uploaded was not detected as PDF. Contact acm@mst.edu if you believe this is a mistake."
        });
      }

      const id = uuid();
      const filename = `${id}.pdf`;
      const url = await uploadFile(flier.createReadStream(), filename, {
        blobHTTPHeaders: {
          blobContentType: "application/pdf"
        }
      });
      input.flierLink = url;
    }

    const hostSig: Sig = await this.sigRepository.findOneOrFail({
      name: String(input.hostSig)
    });
    input.hostSig = hostSig;
    const newResource: Event = this.repository.create({ ...input, creator })[0];
    console.log("NEWEVENT", newResource);

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
