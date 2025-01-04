import createClient, { ClientOptions } from "openapi-fetch";
import "server-only";

import type { paths } from "./types";

const scheme = process.env.JASMINE__NUMBAT__HTTP__SCHEME || "http";
const host = process.env.JASMINE__NUMBAT__HTTP__HOST || "localhost";
const port =
  process.env.JASMINE__NUMBAT__HTTP__PORT === undefined
    ? 10600
    : process.env.JASMINE__NUMBAT__HTTP__PORT;
const path = (process.env.JASMINE__NUMBAT__HTTP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const numbatConfig = {
  baseUrl: url,
} satisfies ClientOptions;

export const numbat = createClient<paths>(numbatConfig);
