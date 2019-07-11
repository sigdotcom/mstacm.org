import { Arg, ClassType, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { BaseEntity, DeepPartial, Repository } from "typeorm";

import { ApolloError } from "apollo-server";

export function ResourceResolver<T extends BaseEntity>(
  ResourceCls: ClassType<T>,
  // See https://github.com/sigdotcom/mstacm.org/issues/2
  // Partial<T> required for full type-safe
  // https://github.com/19majkel94/type-graphql/issues/134
  // may have some hints
  CreateCls: ClassType<Partial<T>>,
  UpdateCls: ClassType<Partial<T>>,
  DeleteCls: ClassType<Partial<T>>,
  repository: Repository<T>
) {
  const resourceName = ResourceCls.name.toLocaleLowerCase();
  const firstLetter = resourceName[0];
  const resourceCamelCase = firstLetter.toUpperCase() + resourceName.slice(1);

  // `isAbstract` decorator option is mandatory to prevent multiple registering in schema
  @Resolver((returns: void) => ResourceCls, { isAbstract: true })
  @Service()
  abstract class ResourceResolverClass {
    @Mutation((returns: void) => ResourceCls, {
      name: `create${resourceCamelCase}`
    })
    public async create(
      @Arg(`data`, (argType: void) => CreateCls) input: DeepPartial<T>
    ): Promise<T> {
      const resource = await repository.create({ ...input });

      return resource.save();
    }

    @Mutation((returns: void) => ResourceCls, {
      name: `update${resourceCamelCase}`
    })
    public async update(
      @Arg("id", (argType: void) => String) id: string,
      @Arg(`data`, (argType: void) => UpdateCls) input: any
    ): Promise<T> {
      const resource = await repository.findOneOrFail(id);
      const updatedResource = repository.merge(resource, { ...input });

      return updatedResource.save();
    }

    @Mutation((returns: void) => DeleteCls, {
      name: `delete${resourceCamelCase}`
    })
    public async remove(
      @Arg("id", (argType: void) => String) id: string
    ): Promise<{ id: string }> {
      const response = await repository.delete(id);

      if (response.affected === 0) {
        throw new ApolloError(
          `Could not delete ${id}. Resource not found.`,
          "RESOURCE_NOT_FOUND"
        );
      }

      return { id };
    }

    @Query((returns: void) => ResourceCls, { name: `${resourceName}` })
    protected async getOne(@Arg("id", (argType: void) => String) id: string) {
      return repository.findOneOrFail({ id } as any);
    }

    @Query((returns: void) => [ResourceCls], { name: `${resourceName}s` })
    protected async getAll() {
      return repository.find();
    }
  }

  return ResourceResolverClass;
}
