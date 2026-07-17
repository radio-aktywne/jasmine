import * as z from "zod";

import {
  ShowsIdGetRequestSchema,
  ShowsModelsEventSchema,
} from "../../../../../../../../../apis/beaver/schemas";
import {
  ListOrderSchema,
  PrerecordingSchema,
} from "../../../../../../../../../apis/numbat/schemas";

export const Schemas = {
  Input: z.object({
    after: z.iso.datetime({ local: true }).optional(),
    before: z.iso.datetime({ local: true }).optional(),
    limit: z.number().int().nonnegative().nullable().default(10),
    order: ListOrderSchema.default("desc"),
    show: ShowsIdGetRequestSchema.shape.path.shape.id.nullish(),
  }),
  Output: z.object({
    count: z.number().int().nonnegative(),
    results: z.array(
      z.object({
        event: z.object({
          ...ShowsModelsEventSchema.omit({ show: true }).shape,
          show: ShowsModelsEventSchema.shape.show
            .unwrap()
            .omit({ events: true })
            .nullable(),
        }),
        prerecording: z.object({
          etag: z.string(),
          length: z.coerce.number(),
          modified: z.string(),
          start: PrerecordingSchema.shape.start,
          type: z.string(),
        }),
      }),
    ),
  }),
};
