import * as z from "zod";

import {
  PrerecordingsEventListRequestSchema,
  PrerecordingsEventListResponseSchema,
} from "../../../../../../../../../apis/numbat/schemas";

export const Schemas = {
  Input: z.object({
    ...PrerecordingsEventListRequestSchema.shape.path.shape,
    ...PrerecordingsEventListRequestSchema.shape.query.unwrap().shape,
  }),
  Output: PrerecordingsEventListResponseSchema,
};
