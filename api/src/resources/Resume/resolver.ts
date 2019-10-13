import { AuthenticationError, UserInputError } from "apollo-server";
import * as fileType from "file-type";
import { GraphQLUpload } from "graphql-upload";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection, Repository } from "typeorm";
import { v4 as uuid } from "uuid";

import { deleteFile, uploadFile } from "../../lib/files";
import { IContext } from "../../lib/interfaces";
import { User } from "../User";
import { Resume } from "./entity";
import { File } from "./input";

const deleteResumeHelper = async (resume: Resume) => {
  await deleteFile(resume.url);
  await resume.remove();
};

/**
 * Resolver for Resume Entity
 */
@Resolver(() => Resume)
export class ResumeResolver {
  public resumeRepo: Repository<Resume> = getConnection().getRepository(Resume);

  @Authorized()
  @Mutation(() => User)
  public async deleteResume(@Ctx() context: IContext): Promise<Resume> {
    const user = context.state.user;

    if (!user) {
      throw new AuthenticationError("Please login to access this resource.");
    }

    const oldResume = await user.resume;
    if (oldResume) {
      await deleteResumeHelper(oldResume);
    }

    return user.resume;
  }

  @Authorized()
  @Mutation(() => Resume)
  public async uploadResume(
    @Ctx() context: IContext,
    @Arg("resume", () => GraphQLUpload) resume: File,
    @Arg("graduationDate", () => Date) graduationDate: Date,
    @Arg("firstName", () => String) firstName: string,
    @Arg("lastName", () => String) lastName: string
  ): Promise<Resume> {
    const user = context.state.user;
    if (!user) {
      throw new AuthenticationError("Please login to access this resource.");
    }

    const passthrough = await fileType.stream(resume.createReadStream());
    if (!passthrough.fileType || passthrough.fileType.ext !== "pdf") {
      throw new UserInputError("Error when parsing user input", {
        resume:
          "File uploaded was not detected as PDF. Contact acm@mst.edu if you believe this is a mistake."
      });
    }

    const oldResume = await user.resume;
    if (oldResume) {
      await deleteResumeHelper(oldResume);
    }

    const id = uuid();
    const filename = `${id}.pdf`;
    const url = await uploadFile(resume.createReadStream(), filename, {
      blobHTTPHeaders: {
        blobContentType: "application/pdf"
      }
    });

    user.graduationDate = graduationDate;
    user.firstName = firstName;
    user.lastName = lastName;

    const userResume = this.resumeRepo.create({
      id,
      url
    });
    user.resume = userResume;

    await user.save();

    return userResume.save();
  }

  @Authorized("view:resumes")
  @Query(() => [Resume])
  public async resumes(): Promise<Resume[]> {
    return this.resumeRepo.find();
  }
}
