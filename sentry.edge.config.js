import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://74970f546e04204042e62fdd0cb54157@o4505909542191104.ingest.sentry.io/4505920458326016",
  ignoreErrors: [
    /Network Error/i,
    /Request Failed/i,
    /Load failed/i,
    /failed to load/i,
    /failed to fetch/i,
  ],
});
