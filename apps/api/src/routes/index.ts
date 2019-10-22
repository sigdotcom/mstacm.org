// Basic Routes
import Koa from "koa";
import Router from "@koa/router";

const router = new Router();

/**
 * Basic healthcheck
 */
router.get("healthcheck/", async (ctx: Koa.ParameterizedContext) => {
  ctx.body = "OK";
  ctx.status = 200;
});

export { router };
