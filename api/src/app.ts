import * as cors from "@koa/cors";
import * as Koa from "koa";
import * as koaBody from "koa-bodyparser";
import * as logger from "koa-logger";

import { authFromBearer, passport } from "./middleware/auth";

import { config } from "./config";

const app = new Koa();

app.keys = [config.SECRET_APP_KEY];

app.use(koaBody());
app.use(cors());
app.use(logger());
app.use(passport.initialize());
app.use(passport.session());
app.use(authFromBearer);

export { app };
