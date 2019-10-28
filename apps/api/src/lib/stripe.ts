import Stripe from "stripe";
import { config } from "../config";

const stripe = new Stripe(config.STRIPE_PRIVATE_TOKEN);

export { stripe };
