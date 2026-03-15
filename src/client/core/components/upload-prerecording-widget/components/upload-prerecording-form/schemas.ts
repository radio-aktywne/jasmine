import * as z from "zod";

export const Schemas = {
  Values: z.object({
    file: z.file().nullish(),
    instance: z.string().nullish(),
  }),
};
