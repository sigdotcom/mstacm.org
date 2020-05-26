import { AuthenticationError, UserInputError } from "apollo-server";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  DeepPartial,
  getRepository,
  MoreThanOrEqual,
  Repository,
  Any
} from "typeorm";

import { GraphQLUpload } from "graphql-upload";
import * as fileType from "file-type";
import { deleteFile, uploadFile } from "../../lib/files";

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
    const event = await this.repository.findOneOrFail(id);
    if (event.flierLink) {
      deleteFile(event.flierLink);
    }
    await this.repository.delete(id);

    return { id };
  }

  @Authorized("update:events")
  @Mutation(() => Event)
  public async updateEvent(
    @Arg("id", () => Number) id: number,
    @Arg("data", () => EventUpdateInput, { nullable: true })
    input: DeepPartial<Event>,
    @Arg("flier", () => GraphQLUpload, { nullable: true }) flier: File
  ): Promise<Event> {
    if (!input && !flier) {
      throw new UserInputError(
        "Please include either some new information or a flier to edit with."
      );
    }

    const event = await this.repository.findOneOrFail(id);
    const updates: DeepPartial<Event> = input || {};

    if (flier) {
      const passthrough = await fileType.stream(flier.createReadStream());
      if (
        !passthrough.fileType ||
        passthrough.fileType.ext !== "jpg" ||
        passthrough.fileType.mime !== "image/jpeg"
      ) {
        throw new UserInputError("Error when parsing user input", {
          flier:
            "File uploaded was not detected as JPG. Contact acm@mst.edu if you believe this is a mistake."
        });
      }

      const origName: string =
        flier.filename.substr(0, flier.filename.lastIndexOf(".")) ||
        flier.filename;
      const encoded: string = encodeURIComponent(origName.replace(" ", "_"));
      const filename = `events/${encoded}_${event.id}.jpg`;
      const url = await uploadFile(
        flier.createReadStream(),
        filename,
        "image/jpeg"
      );
      if (event.flierLink) {
        deleteFile(event.flierLink);
      }
      updates.flierLink = url;
    }

    if (input && input.hostSig) {
      updates.hostSig = await this.sigRepository.findOneOrFail({
        name: String(input.hostSig)
      });
    }

    const updatedResource = this.repository.merge(event, { ...updates });
    return updatedResource.save();
  }

  @Authorized("create:events")
  @Mutation(() => Event)
  public async createEvent(
    @Ctx() context: IContext,
    @Arg("data", () => EventCreateInput)
    input: DeepPartial<Event>,
    @Arg("flier", () => GraphQLUpload, { nullable: true }) flier?: File
  ): Promise<Event> {
    const creator: User | undefined = context.state.user;

    if (!creator) {
      throw new AuthenticationError("Please login to access this resource.");
    }

    input.hostSig = await this.sigRepository.findOneOrFail({
      name: String(input.hostSig)
    });
    const newResource = await this.repository
      .create({ ...input, creator })
      .save();

    if (flier) {
      const passthrough = await fileType.stream(flier.createReadStream());
      if (
        !passthrough.fileType ||
        passthrough.fileType.ext !== "jpg" ||
        passthrough.fileType.mime !== "image/jpeg"
      ) {
        throw new UserInputError("Error when parsing user input", {
          flier:
            "File uploaded was not detected as JPG. Contact acm@mst.edu if you believe this is a mistake."
        });
      }

      const origName: string =
        flier.filename.substr(0, flier.filename.lastIndexOf(".")) ||
        flier.filename;
      const encoded: string = encodeURIComponent(origName.replace(" ", "_"));
      const filename = `events/${encoded}_${newResource.id}.jpg`;
      const url = await uploadFile(
        flier.createReadStream(),
        filename,
        "image/jpeg"
      );
      newResource.flierLink = url;
    }
    
    let charPool: string = "0123456789abcdefghijklmnopqrstuvwxyz";
    let keyPlaceholder: string = "";
    for(let i = 0; i < 4; i++)
      keyPlaceholder += charPool.charAt(Math.floor(Math.random() * 36));
    newResource.key = keyPlaceholder;

    return newResource.save();
  }

  @Authorized()
  @Mutation((_: void) => Event)
  public async addAttendee(
    @Arg("eventId") eventId: number,
    @Arg("userId") userId: string,
  ): Promise<Event> {
    const event: Event = await Event.findOneOrFail({ id: eventId });
    let users: User[] = await event.attendees;
    users.push(await User.findOneOrFail({ id: userId }));
    event.attendees = users;
    return event.save();
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

  @Query(() => [Event])
  protected async eventsWithKey(@Arg("key", () => String) key: string): Promise<Event[]> {
    return this.repository.find({ key });
  }
}
