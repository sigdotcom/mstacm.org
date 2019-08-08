import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { DeepPartial, getRepository, Repository } from "typeorm";
import { Permission } from "./entity";
import { PermissionCreateInput } from "./input";

@Resolver((returns: void) => Permission)
export class PermissionResolver {
  public repository: Repository<Permission> = getRepository(Permission);

  @Authorized("SUPERADMIN")
  @Query((returns: void) => [Permission])
  public async permissions(): Promise<Permission[]> {
    return this.repository.find();
  }

  @Authorized("SUPERADMIN")
  @Mutation((returns: void) => Permission)
  public async createPermission(
    @Arg("data", (argType: void) => PermissionCreateInput)
    input: DeepPartial<Permission>
  ): Promise<Permission> {
    const newResource = this.repository.create({ ...input });

    return newResource.save();
  }
}
