"use server";

import { getSession } from "../../../lib/auth/get-session";
import {
  listEventsInstances as internalListEventsInstances,
  ListEventsInstancesError,
} from "../../../lib/wrappers/list-events-instances";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ListEventsInstancesInput, ListEventsInstancesOutput } from "./types";

export async function listEventsInstances(
  input: ListEventsInstancesInput,
): Promise<ListEventsInstancesOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { instances } = await internalListEventsInstances({
      end: parsed.data.end,
      include: parsed.data.include,
      order: parsed.data.order,
      start: parsed.data.start,
      where: parsed.data.where,
    });
    return { data: instances };
  } catch (error) {
    if (error instanceof ListEventsInstancesError)
      return { error: errors.generic };
    throw error;
  }
}
