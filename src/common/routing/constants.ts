import { msg } from "@lingui/core/macro";

export const commonRoutingConstants = {
  routes: {
    "/": msg({ message: "/" }),
    "/upload": msg({ message: "/upload" }),
  },
} as const;
