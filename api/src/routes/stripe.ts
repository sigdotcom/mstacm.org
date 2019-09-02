// Stripe routes
import * as Koa from "koa";
import * as Router from "koa-router";

import { events } from "stripe";

import { config } from "../config";
import { stripe } from "../lib/stripe";

const router = new Router();

/**
 * Stripe payment intent callback
 */
router.post("callback", async (ctx: Koa.ParameterizedContext) => {
  let event: events.IEvent;
  const sig: string = ctx.request.headers["stripe-signature"] || "";

  try {
    event = stripe.webhooks.constructEvent(
      ctx.request.rawBody,
      sig,
      config.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    ctx.throw(400, `Webhook Error: ${err.message}`);

    return;
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      // const paymentIntent = event.data.object;
      break;
    default:
      // Unexpected event type
      ctx.throw(400, `Webhook Error: Unexpected event ${event.type}`);
  }

  ctx.status = 200;

  return;
});

export { router };
