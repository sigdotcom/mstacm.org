import { Service } from "typedi";

import { ResourceResolver } from "./resolver";

interface IResource {
  id: number;
}

// we need to use factory as we need separate instance of service for each generic
@Service()
export class ResourceServiceFactory {
  public create<TResource extends IResource>(resources?: TResource[]) {
    return new ResourceService(resources);
  }
}

export class ResourceService<TResource extends IResource> {
  constructor(protected resources: TResource[] = []) {}

  public getOne(id: number): TResource | undefined {
    return this.resources.find(res => res.id === id);
  }

  public getAll(skip: number, take: number): TResource[] {
    const start: number = skip;
    const end: number = skip + take;

    return this.resources.slice(start, end);
  }
}

export { IResource, ResourceResolver };
