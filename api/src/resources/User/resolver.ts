import {
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { getRepository } from "typeorm";
import { Lazy } from "../../lib/helpers";
import { IContext } from "../../lib/interfaces";
import { Permission } from "../Permission";
import { ResourceResolver } from "../Resource";
import { User } from "./entity";
import { UserCreateInput, UserDeletePayload, UserUpdateInput } from "./input";

const resource = User;
type resourceType = User;

@Resolver((returns: void) => User)
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
  @FieldResolver((returns: void) => String, { nullable: true })
  public isSuperAdmin(
    @Root() user: User,
    @Ctx() context: IContext
  ): boolean | undefined {
    if (user.id === context.user.id) {
      return user.isSuperAdmin;
    }

    return undefined;
  }

  // Workaround waiting for
  // https://github.com/19majkel94/type-graphql/issues/351
  @Authorized()
  @FieldResolver((returns: void) => String, { nullable: true })
  public permissions(
    @Root() user: User,
    @Ctx() context: IContext
  ): Lazy<Permission[]> | undefined {
    if (user.id === context.user.id) {
      return user.permissions;
    }

    return undefined;
  }

  @Query((returns: void) => resource, { name: `me`, nullable: true })
  protected async me(@Ctx() context: any) {
    const user: User = context.state.user;
    if (!user) {
      return undefined;
    }

    return user;
  }
}
