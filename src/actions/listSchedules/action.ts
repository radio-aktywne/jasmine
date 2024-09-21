"use server";

import { emishows } from "../../api";
import { ListSchedulesData, ListSchedulesProps } from "./types";

const errorMessage = "Listing schedules failed.";

export async function listSchedules({
  start,
  end,
  limit,
  offset,
  where,
  include,
  order,
}: ListSchedulesProps = {}) {
  try {
    const { data, error, response } = await emishows.GET("/schedule", {
      params: {
        query: { start, end, limit, offset, where, include, order },
      },
    });

    if (error || !response.ok) return { data: undefined, error: errorMessage };
    return { data: data as ListSchedulesData, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
