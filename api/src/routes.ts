import Router from "@koa/router";

import { router as indexRouter } from "./routes/index";
import { router as stripeRouter } from "./routes/stripe";

const router = new Router();
router.use("/", indexRouter.routes(), indexRouter.allowedMethods());
router.use("/stripe/", stripeRouter.routes(), stripeRouter.allowedMethods());

export { router };
