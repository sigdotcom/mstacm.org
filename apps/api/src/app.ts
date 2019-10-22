import cors from "@koa/cors";
import Koa from "koa";
import koaBody from "koa-bodyparser";
import logger from "koa-logger";

import { config } from "./config";
import { authFromBearer, passport } from "./middleware/auth";
import { router } from "./routes";

const app = new Koa();

app.keys = [config.SECRET_APP_KEY];

app.use(koaBody());
app.use(cors());
app.use(logger());
app.use(passport.initialize());
app.use(passport.session());
app.use(authFromBearer);

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
