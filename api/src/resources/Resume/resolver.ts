import { UserInputError } from "apollo-server";
import * as fileType from "file-type";
import { GraphQLUpload } from "graphql-upload";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
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

@Resolver((of: void) => Resume)
export class ResumeResolver {
  public resumeRepo: Repository<Resume> = getConnection().getRepository(Resume);

  @Authorized()
  @Mutation((returns: void) => User)
  public async deleteResume(@Ctx() context: IContext): Promise<Resume> {
    const user = context.state.user;
    const oldResume = await user.resume;
    if (oldResume) {
      await deleteResumeHelper(oldResume);
    }

    if (user.resume.id === undefined) {
      user.resume = undefined;
    }

    return user;
  }

  @Authorized()
  @Mutation((returns: void) => Resume)
  public async uploadResume(
    @Ctx() context: IContext,
    @Arg("resume", (returns: void) => GraphQLUpload) resume: File,
    @Arg("graduationDate", (returns: void) => Date) graduationDate: Date,
    @Arg("firstName", (returns: void) => String) firstName: string,
    @Arg("lastName", (returns: void) => String) lastName: string
  ): Promise<Resume> {
    const user = context.state.user;
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
      user.resume = undefined;
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

    const userResume = await this.resumeRepo.create({
      id,
      url,
      user: await user.save()
    });

    return userResume.save();
  }
}
