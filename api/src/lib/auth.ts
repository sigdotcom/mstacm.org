import { AuthChecker } from "type-graphql";
import { IContext } from "./interfaces";

// create auth checker function
export const authChecker: AuthChecker<IContext> = (
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
  if (user.roles.some((role: string) => roles.includes(role))) {
    // grant access if the roles overlap
    return true;
  }

  // no roles matched, restrict access
  return false;
};
