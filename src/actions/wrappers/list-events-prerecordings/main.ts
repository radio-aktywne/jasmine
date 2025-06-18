"use server";

import { getSession } from "../../../lib/auth/get-session";
import {
  listEventsPrerecordings as internalListEventsPrerecordings,
  ListEventsPrerecordingsError,
} from "../../../lib/wrappers/list-events-prerecordings";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import {
  ListEventsPrerecordingsInput,
  ListEventsPrerecordingsOutput,
} from "./types";

export async function listEventsPrerecordings(
  input: ListEventsPrerecordingsInput,
): Promise<ListEventsPrerecordingsOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { prerecordings } = await internalListEventsPrerecordings({
      after: parsed.data.after,
      before: parsed.data.before,
      include: parsed.data.include,
      order: parsed.data.order,
      where: parsed.data.where,
    });
    return { data: prerecordings };
  } catch (error) {
    if (error instanceof ListEventsPrerecordingsError)
      return { error: errors.generic };
    throw error;
  }
}
