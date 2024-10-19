import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.JASMINE__NUMBAT__HTTP__SCHEME || "http";
const host = process.env.JASMINE__NUMBAT__HTTP__HOST || "localhost";
const port =
  process.env.JASMINE__NUMBAT__HTTP__PORT === undefined
    ? 28000
    : process.env.JASMINE__NUMBAT__HTTP__PORT;
const path = (process.env.JASMINE__NUMBAT__HTTP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const numbat = createClient<paths>({ baseUrl: url });
