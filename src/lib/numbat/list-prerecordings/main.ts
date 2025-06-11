import "server-only";

import { numbat } from "../../../services/numbat";
import { NumbatError } from "../errors";
import { EventNotFoundError } from "./errors";
import { ListPrerecordingsInput, ListPrerecordingsOutput } from "./types";

export async function listPrerecordings({
  after,
  before,
  event,
  limit,
  offset,
  order,
}: ListPrerecordingsInput): Promise<ListPrerecordingsOutput> {
  const { data, error, response } = await numbat.GET("/prerecordings/{event}", {
    cache: "no-store",
    params: {
      path: {
        event: event,
      },
      query: {
        after: after,
        before: before,
        limit: limit,
        offset: offset,
        order: order,
      },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new EventNotFoundError();
    throw new NumbatError();
  }

  return { prerecordings: data };
}
