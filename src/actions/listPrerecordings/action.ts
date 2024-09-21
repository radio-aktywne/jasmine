"use server";

import { emilounge } from "../../api";
import { ListPrerecordingsData, ListPrerecordingsProps } from "./types";

const errorMessage = "Listing prerecordings failed.";

export async function listPrerecordings({
  event,
  after,
  before,
  limit,
  offset,
  order,
}: ListPrerecordingsProps) {
  try {
    const { data, error, response } = await emilounge.GET(
      "/prerecordings/{event}",
      {
        params: {
          path: { event },
          query: { after, before, limit, offset, order },
        },
      },
    );

    if (error || !response.ok) return { data: undefined, error: errorMessage };
    return { data: data as ListPrerecordingsData, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
