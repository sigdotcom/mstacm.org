// Stripe routes
import * as Koa from "koa";
import * as Router from "koa-router";

import { events, paymentIntents } from "stripe";

import { config } from "../config";
import { MembershipTypes } from "../lib/products";
import { stripe } from "../lib/stripe";
import { User } from "../resources/User";

const router = new Router();

const addDates: any = {
  [MembershipTypes.SEMESTERLY]: 6,
  [MembershipTypes.YEARLY]: 12
};

/**
 * Stripe payment intent callback
 */
router.post("callback", async (ctx: Koa.ParameterizedContext) => {
  let stripeEvent: events.IEvent;
  const signature: string = ctx.request.headers["stripe-signature"] || "";

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      ctx.request.rawBody,
      signature,
      config.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    ctx.throw(400, `Webhook Error: ${err.message}`);

    return;
  }

  switch (stripeEvent.type) {
    case "payment_intent.succeeded":
      const intent: paymentIntents.IPaymentIntent = stripeEvent.data
        .object as paymentIntents.IPaymentIntent;
      const productTag: string = intent.metadata.productTag;
      const userId: string = intent.metadata.userId;

      // If the userId or productTag is not set, we don't to perform
      // any backend processing on it.
      if (!userId || !productTag) {
        ctx.status = 200;

        return;
      }

      const user: User = await User.findOneOrFail({ id: userId });
      const curDate: Date = new Date();
      let newMonth: number = curDate.getMonth() + addDates[productTag];

      const normalizedMonth: number = (newMonth % 12) + 1;

      if (normalizedMonth > 5 && normalizedMonth < 8) {
        newMonth += 8 - normalizedMonth;
      }

      user.membershipExpiration = new Date(curDate.setMonth(newMonth));
      await user.save();

      break;
    default:
      // Unexpected event type
      ctx.throw(400, `Webhook Error: Unexpected event ${stripeEvent.type}`);
  }

  ctx.status = 200;

  return;
});

export { router };
