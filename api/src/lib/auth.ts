import { AuthChecker } from "type-graphql";

import { Permission } from "../resources/Permission";
import { IContext } from "./interfaces";

// create auth checker function
export const authChecker: AuthChecker<IContext> = async (
  {
    context: {
      state: { user }
    }
  }: { context: IContext },
  roles: string[]
) => {
  if (process.env.NODE_ENV === "development") {
    const username = user ? user.email : undefined;
    console.debug("[auth] Skipping permission check (development mode)...");
    console.info(`[auth] Currently logged in as ${username}`);

    return true;
  }

  if (roles.length === 0) {
    // if `@Authorized()`, check only is user exist
    return user !== undefined;
  }
  // there are some roles defined now

  if (!user) {
    // and if no user, restrict access
    return false;
  }

  const permissions = await user.permissions;
  const permMatchesRole = permissions.some((permission: Permission) =>
    roles.includes(permissions.name)
  );
  if (permMatchesRole) {
    // grant access if the roles overlap
    return true;
  }

  // no roles matched, restrict access
  return false;
};
