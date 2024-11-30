"use server";

import {
  deletePrerecording as internalDeletePrerecording,
  PrerecordingNotFoundError,
} from "../../../lib/numbat/delete-prerecording";
import { NumbatError } from "../../../lib/numbat/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { DeletePrerecordingInput, DeletePrerecordingOutput } from "./types";

export async function deletePrerecording(
  input: DeletePrerecordingInput,
): Promise<DeletePrerecordingOutput> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    await internalDeletePrerecording({
      event: parsed.data.event,
      start: parsed.data.start,
    });
    return {};
  } catch (error) {
    if (error instanceof PrerecordingNotFoundError)
      return { error: errors.notFound };
    if (error instanceof NumbatError) return { error: errors.generic };
    throw error;
  }
}
