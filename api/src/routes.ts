import { router as indexRouter } from "./routes/index";
import { router as stripeRouter } from "./routes/stripe";

import * as Router from "koa-router";

const router = new Router();
router.use("/", indexRouter.routes(), indexRouter.allowedMethods());
router.use("/stripe/", stripeRouter.routes(), stripeRouter.allowedMethods());

export { router };
