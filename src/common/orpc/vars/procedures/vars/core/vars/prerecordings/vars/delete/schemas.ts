import {
  PrerecordingsEventStartDeleteRequestSchema,
  PrerecordingsEventStartDeleteResponseSchema,
} from "../../../../../../../../../apis/numbat/schemas";

export const Schemas = {
  Input: PrerecordingsEventStartDeleteRequestSchema.shape.path,
  Output: PrerecordingsEventStartDeleteResponseSchema,
};
