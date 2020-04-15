import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { Group } from "./entity";
import { Permission } from "../Permission";
import { BadUserInputError } from "../../lib/errors";

@Resolver(() => Group)
export class GroupResolver {
  public repository: Repository<Group> = getRepository(Group);

  @Authorized("view:groups")
  @Query(() => [Group])
  public async groups(): Promise<Group[]> {
    return this.repository.find();
  }

  @Authorized("create:group")
  @Mutation(() => Group)
  public async createGroup(
    @Arg("name", () => String)
    name: string,
    @Arg("permissionIds", () => [String])
    permissionIds: string[]
  ): Promise<Group> {
    let resolvedPermissions: Permission[] | undefined = undefined;
    if (permissionIds) {
      const permissions: Permission[] = await Permission.findByIds(
        permissionIds
      );

      if (permissions.length !== permissionIds.length) {
        throw new BadUserInputError(
          "Specified permission ids are duplicated and/or do not exist in the database."
        );
      }
      resolvedPermissions = permissions;
    }
    const newResource = this.repository.create({
      name,
      permissions: resolvedPermissions,
    });

    return newResource.save();
  }
}
