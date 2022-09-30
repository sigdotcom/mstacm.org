import { ParameterizedContext } from "koa";
import { User } from "../resources/User";

export interface IContext extends ParameterizedContext {
  state: {
    user?: User;
    scope?: string;
  };
}

export interface IUserInfo {
  sub: string;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
}
