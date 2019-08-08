// Import dependencies
import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const HOUR_IN_MS = 3600000;

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: HOUR_IN_MS * 4
});

// Create `axios` instance passing the newly created `cache.adapter`
export const http = axios.create({
  adapter: cache.adapter as any
});
