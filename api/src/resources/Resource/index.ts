import { Service } from "typedi";

import { ResourceResolver } from "./resolver";

interface IResource {
  id: number;
}

export { IResource, ResourceResolver };
