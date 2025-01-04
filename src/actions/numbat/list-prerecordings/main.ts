"use server";

import { auth } from "../../../auth";
import { NumbatError } from "../../../lib/numbat/errors";
import {
  EventNotFoundError,
  listPrerecordings as internalListPrerecordings,
} from "../../../lib/numbat/list-prerecordings";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ListPrerecordingsInput, ListPrerecordingsOutput } from "./types";

export async function listPrerecordings(
  input: ListPrerecordingsInput,
): Promise<ListPrerecordingsOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { prerecordings } = await internalListPrerecordings({
      after: parsed.data.after,
      before: parsed.data.before,
      event: parsed.data.event,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
      order: parsed.data.order,
    });
    return { data: prerecordings };
  } catch (error) {
    if (error instanceof EventNotFoundError) return { error: errors.notFound };
    if (error instanceof NumbatError) return { error: errors.generic };
    throw error;
  }
}
