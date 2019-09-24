import { AuthChecker } from "type-graphql";

import { Permission } from "../resources/Permission";
import { User } from "../resources/User";
import { IContext } from "./interfaces";

// create auth checker function
// You can extract root, args, and info later.
// Root will be especially important as it is the object you are
// attempting to resolve.
// https://github.com/MichalLytek/type-graphql/blob/master/docs/authorization.md
export const authChecker: AuthChecker<IContext> = async (
  { context }: { context: IContext },
  roles: string[]
) => {
  const user: User | undefined = context.state.user;
  if (process.env.NODE_ENV === "development") {
    const username = user ? user.email : undefined;
    console.debug("[auth] Skipping permission check (development mode)...");
    console.info(`[auth] Currently logged in as ${username}`);

    return true;
  }

  // if `@Authorized()`, check only is user exist
  if (roles.length === 0) {
    return user !== undefined;
  }
  // there are some roles defined now

  // See if user/machine application has necessary scopes.
  // A machine application will not have a state.user, therefore,
  // this check must come first
  if (context.state.scope) {
    const scopes: string[] = context.state.scope.split(" ");

    if (scopes.includes("all")) {
      return true;
    }

    if (scopes.some((scope: string) => roles.includes(scope))) {
      // grant access if the roles overlap
      return true;
    }
  }

  // and if no user, restrict access
  if (!user) {
    return false;
  }

  if (user.isSuperAdmin) {
    return true;
  }

  const permissions = await user.permissions;
  const permMatchesRole = permissions.some((permission: Permission) =>
    roles.includes(permission.name)
  );
  if (permMatchesRole) {
    // grant access if the roles overlap
    return true;
  }

  // no roles matched, restrict access
  return false;
};
