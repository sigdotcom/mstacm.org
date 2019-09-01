import * as passport from "koa-passport";

import axios from "axios";
import * as JWT from "jsonwebtoken";

import { passportJwtSecret } from "jwks-rsa";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
  VerifiedCallback
} from "passport-jwt";

import { config } from "../config";
import { IContext, IUserInfo } from "../lib/interfaces";

import { Application } from "../resources/Application";
import { User } from "../resources/User";

export const authFromBearer = async (
  ctx: IContext,
  next: (err?: any) => Promise<any>
) => {
  if (ctx.headers.authorization) {
    const potentialJwt: string = ctx.headers.authorization.split(" ")[1];
    const decodedJwt: string | { [key: string]: any } | null = JWT.decode(
      potentialJwt,
      { complete: true }
    );
    let authStrategy: "jwt" | "bearer";

    if (decodedJwt) {
      authStrategy = "jwt";
    } else {
      authStrategy = "bearer";
    }

    await passport.authenticate(
      authStrategy,
      { session: false },
      async (err: any, user: User, info: any) => {
        if (user) {
          await ctx.login(user);
        }
      }
    )(ctx, next);
  }

  await next();
};

const JWT_OPTS: StrategyOptions = {
  algorithms: [config.JWT_ALGORITHM],
  audience: config.JWT_AUDIENCE,
  issuer: config.JWT_ISSUER,
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKeyProvider: passportJwtSecret({
    cache: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.JWT_JWKS_URI,
    rateLimit: true
  })
};
passport.use(
  new JwtStrategy(
    JWT_OPTS,
    async (req: { headers: any }, payload: any, done: VerifiedCallback) => {
      const { sub } = payload;

      try {
        let user = await User.findOne({
          sub
        });

        // If we don't find the user, we need to create them in our database.
        // This can late be replaced with something like
        // https://auth0.com/docs/hooks/concepts/post-user-registration-extensibility-point
        if (!user) {
          // The user should be giving us their access token
          // https://auth0.com/docs/api-auth/why-use-access-tokens-to-secure-apis
          // ; therefore, we need to fetch their data from auth0 if they haven't
          // been created yet.
          const response = await axios.get(config.JWT_USERINFO_URI, {
            headers: {
              Authorization: req.headers.authorization
            }
          });

          const userInfo: IUserInfo | undefined = response.data;

          if (!userInfo) {
            throw new Error("User information not returned from request.");
          }

          user = new User();
          user.firstName = userInfo.given_name;
          user.lastName = userInfo.family_name;
          user.email = userInfo.email;
          user.emailVerified = userInfo.email_verified;
          user.sub = userInfo.sub;
          user = await user.save();
        }
        done(undefined, user);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token: string, done: any) => {
    try {
      if (token.length !== 36) {
        return done(new Error("Invalid UUID Length"), undefined);
      }

      const application = await Application.findOne({ token });
      if (!application) {
        return done(new Error("Application was not found"), undefined);
      }

      const user = await application.user;

      return done(undefined, user, { scope: "all" });
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user: User, done: any) => {
  done(undefined, user.id);
});

passport.deserializeUser(async (userID: string, done: any) => {
  const user = await User.findOne({ id: userID });
  if (user) {
    done(undefined, user);
  } else {
    done(undefined, false);
  }
});

export { passport };
