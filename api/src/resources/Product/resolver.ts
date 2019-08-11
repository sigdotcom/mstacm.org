import { Authorized, Query, Resolver } from "type-graphql";
import { Product } from "../Product";

import { getConnection, Repository } from "typeorm";

@Resolver((of: void) => Product)
export class ProductResolver {
  private productRepo: Repository<Product> = getConnection().getRepository(
    Product
  );

  @Authorized()
  @Query((returns: void) => [Product])
  public async products(): Promise<Product[]> {
    return this.productRepo.find();
  }
}
