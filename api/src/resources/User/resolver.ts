import {
  Authorized,
  Arg,
  Ctx,
  Mutation,
  FieldResolver,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { getRepository } from "typeorm";
import { BadUserInputError } from "../../lib/errors";
import { Lazy } from "../../lib/helpers";
import { IContext } from "../../lib/interfaces";
import { Permission } from "../Permission";
import { Group } from "../Group";
import { ResourceResolver } from "../Resource";
import { User } from "./entity";
import { UserCreateInput, UserDeletePayload, UserUpdateInput } from "./input";

const resource = User;
type resourceType = User;

@Resolver((_: void) => User)
export class UserResolver extends ResourceResolver<resourceType>(
  resource,
  UserCreateInput,
  UserUpdateInput,
  UserDeletePayload,
  getRepository(resource)
) {
  // Workaround waiting for
  // https://github.com/19majkel94/type-graphql/issues/351
  @Authorized()
  @FieldResolver((_: void) => String, { nullable: true })
  public isSuperAdmin(
    @Root() user: User,
    @Ctx() context: IContext
  ): boolean | undefined {
    const curUser = context.state.user;
    if (curUser && user.id === curUser.id) {
      return user.isSuperAdmin;
    }

    return undefined;
  }

  // Workaround waiting for
  // https://github.com/19majkel94/type-graphql/issues/351
  @Authorized()
  @FieldResolver((_: void) => String, { nullable: true })
  public permissions(
    @Root() user: User,
    @Ctx() context: IContext
  ): Lazy<Permission[]> | undefined {
    const curUser = context.state.user;

    if (curUser && user.id === curUser.id) {
      return user.permissions;
    }

    return undefined;
  }

  @Authorized("update:user_groups")
  @Mutation((_: void) => User)
  public async addUserToGroups(
    @Arg("userId") userId: string,
    @Arg("groupIds", (_: void) => [String]) groupIds: string[]
  ): Promise<User> {
    const groups: Set<Group> = new Set(await Group.findByIds(groupIds));

    if (groups.size !== groupIds.length) {
      throw new BadUserInputError(
        "One or more groups specified were repeat groups or not found in the database."
      );
    }

    const user: User = await User.findOneOrFail({ id: userId });
    const curGroups: Set<Group> = new Set(await user.groups);
    user.groups = [...new Set([...groups, ...curGroups])];
    return user.save();
  }

  @Authorized("update:user_permissions")
  @Mutation((_: void) => User)
  public async addPermissionsToUser(
    @Arg("userId") userId: string,
    @Arg("permissionIds", (_: void) => [String]) permissionIds: string[]
  ): Promise<User> {
    const permissions: Set<Permission> = new Set(
      await Permission.findByIds(permissionIds)
    );

    if (permissions.size !== permissionIds.length) {
      throw new BadUserInputError(
        "One or more groups specified were repeat groups or not found in the database."
      );
    }

    const user: User = await User.findOneOrFail({ id: userId });
    const curPermissions: Set<Permission> = new Set(await user.permissions);
    user.permissions = [...new Set([...permissions, ...curPermissions])];
    return user.save();
  }

  @Query((_: void) => resource, { nullable: true })
  protected async me(@Ctx() context: IContext) {
    const user: User | undefined = context.state.user;
    if (!user) {
      return undefined;
    }

    return user;
  }
}
