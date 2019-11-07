import { Arg, ClassType, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { BaseEntity, DeepPartial, Repository } from "typeorm";

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
  @Resolver(() => ResourceCls, { isAbstract: true })
  @Service()
  abstract class ResourceResolverClass {
    @Mutation(() => ResourceCls, {
      name: `create${resourceCamelCase}`
    })
    public async create(
      @Arg(`data`, () => CreateCls) input: DeepPartial<T>
    ): Promise<T> {
      const resource = repository.create({ ...input });

      return resource.save();
    }

    @Mutation(() => ResourceCls, {
      name: `update${resourceCamelCase}`
    })
    public async update(
      @Arg("id", () => String) id: string,
      @Arg(`data`, () => UpdateCls) input: any
    ): Promise<T> {
      const resource = await repository.findOneOrFail(id);
      const updatedResource = repository.merge(resource, { ...input });

      return updatedResource.save();
    }

    @Mutation(() => DeleteCls, {
      name: `delete${resourceCamelCase}`
    })
    public async remove(
      @Arg("id", () => String) id: string
    ): Promise<{ id: string }> {
      await repository.delete(id);

      return { id };
    }

    @Query(() => ResourceCls, { name: `${resourceName}` })
    protected async getOne(@Arg("id", () => String) id: string) {
      return repository.findOneOrFail({ id } as any);
    }

    @Query(() => [ResourceCls], { name: `${resourceName}s` })
    protected async getAll() {
      return repository.find();
    }
  }

  return ResourceResolverClass;
}
