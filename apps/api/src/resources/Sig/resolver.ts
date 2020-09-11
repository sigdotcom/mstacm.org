import { Resolver, Query } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { ResourceResolver } from "../Resource";
import { Sig } from "./entity";
import { SigCreateInput, SigDeletePayload, SigUpdateInput } from "./input";

const resource = Sig;
type resourceType = Sig;

@Resolver(() => Sig)
export class SigResolver extends ResourceResolver<resourceType>(
  resource,
  SigCreateInput,
  SigUpdateInput,
  SigDeletePayload,
  getRepository(resource)
) {

  public repository: Repository<Sig> = getRepository(Sig);

  @Query(() => [Sig])
  protected async getSigs(): Promise<Sig[]> {
    console.log("This query is being used");
    return this.repository.find();
  }


}
