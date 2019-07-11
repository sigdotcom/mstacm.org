import * as Koa from "koa";
import * as passport from "koa-passport";

import * as JWT from "jsonwebtoken";

import { Strategy as BearerStrategy } from "passport-http-bearer";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
  VerifiedCallback
} from "passport-jwt";

import { config } from "../config";
import { http } from "../lib/http";

import { User } from "../resources/User";

export const authFromBearer = async (
  ctx: Koa.ParameterizedContext,
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

const keyProvider = async (
  request: Koa.BaseRequest,
  rawJwtToken: string,
  done: VerifiedCallback
) => {
  const decodedJwt: any = JWT.decode(rawJwtToken, { complete: true });
  const header = decodedJwt.header;

  if (!header || !header.kid) {
    done(new Error("Invalid header"), undefined);
  }

  try {
    const response = await http.get(config.GOOGLE_CERTS_DOMAIN);
    const cert = response.data[header.kid];

    if (!cert) {
      done(new Error("Invalid JWT certificate"), undefined);
    }

    done(undefined, cert);
  } catch (err) {
    done(err, undefined);
  }
};

const JWT_OPTS: StrategyOptions = {
  algorithms: [config.GOOGLE_JWT_ALGORITHM],
  audience: config.GOOGLE_CLIENT_ID,
  issuer: config.GOOGLE_ISSUER,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKeyProvider: keyProvider
};
passport.use(
  new JwtStrategy(JWT_OPTS, async (payload: any, done: VerifiedCallback) => {
    const { hd, given_name, family_name, email, sub } = payload;

    if (hd !== config.HOSTED_DOMAIN) {
      done(
        new Error(`Email does not match hosted domain ${config.HOSTED_DOMAIN}`),
        undefined
      );
    }

    try {
      let user = await User.findOne({
        googleSub: sub
      });

      if (!user) {
        user = new User();
        user.firstName = given_name;
        user.lastName = family_name;
        user.email = email;
        user.googleSub = sub;
        user = await user.save();
      }
      done(undefined, user);
    } catch (err) {
      done(err, undefined);
    }
  })
);

passport.use(
  new BearerStrategy(async (token: string, done: any) => {
    try {
      if (token.length !== 36) {
        return done(new Error("Invalid UUID Length"), undefined);
      }

      const application: undefined = undefined;
      const user: undefined = undefined;
      // const application = await Application.findOne(
      //   { token },
      //   { relations: ["account", "account.permissions"] }
      // );
      // const user = application.account;

      if (!application) {
        return done(new Error("Application was not found"), undefined);
      }

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
