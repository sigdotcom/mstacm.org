import { ParameterizedContext } from "koa";
import { User } from "../User";

export interface IContext extends ParameterizedContext {}

interface IOwnership {
  isOwner(user: User): boolean;
}
