import * as z from "zod";

import { constants } from "./constants";

export const Schemas = {
  Input: z.object({
    file: z.codec(z.file().nullable(), z.file().nullish(), {
      decode: (value) => value ?? undefined,
      encode: (value) => value ?? null,
    }),
    instance: z.codec(z.string().nullable(), z.string().nullish(), {
      decode: (value) => value ?? undefined,
      encode: (value) => value ?? null,
    }),
  }),
  Output: z.object({
    file: z
      .file()
      .nullable()
      .pipe(z.file().mime([...constants.file.types])),
    instance: z.string().nullable().pipe(z.string().min(1)),
  }),
};
