import "server-only";

import dayjs from "../../../dayjs";
import { BeaverError } from "../../beaver/errors";
import { listEvents } from "../../beaver/list-events";
import { NumbatError } from "../../numbat/errors";
import { headPrerecording } from "../../numbat/head-prerecording";
import { listPrerecordings } from "../../numbat/list-prerecordings";
import { datetimeDataFormat } from "./constants";
import { ListEventsPrerecordingsError } from "./errors";
import {
  ListEventsPrerecordingsInput,
  ListEventsPrerecordingsOutput,
} from "./types";

export async function listEventsPrerecordings({
  after,
  before,
  include,
  limit,
  order = "desc",
  timezone,
  where,
}: ListEventsPrerecordingsInput): Promise<ListEventsPrerecordingsOutput> {
  const { events } = await (async () => {
    try {
      return listEvents({ include: include, limit: null, where: where });
    } catch (error) {
      if (error instanceof BeaverError)
        throw new ListEventsPrerecordingsError();
      throw error;
    }
  })();

  const promises = events.events.map(async (event) => {
    const { prerecordings } = await (async () => {
      try {
        return await listPrerecordings({
          after: after
            ? dayjs
                .tz(after, timezone)
                .startOf("day")
                .tz(event.timezone)
                .format(datetimeDataFormat)
            : undefined,
          before: before
            ? dayjs
                .tz(before, timezone)
                .endOf("day")
                .tz(event.timezone)
                .format(datetimeDataFormat)
            : undefined,
          event: event.id,
          limit: limit,
          order: order,
        });
      } catch (error) {
        if (error instanceof NumbatError)
          throw new ListEventsPrerecordingsError();
        throw error;
      }
    })();

    return prerecordings.prerecordings.map(async (prerecording) => {
      const { etag, length, modified, type } = await (async () => {
        try {
          return await headPrerecording({
            event: event.id,
            start: prerecording.start,
          });
        } catch (error) {
          if (error instanceof NumbatError)
            throw new ListEventsPrerecordingsError();
          throw error;
        }
      })();

      return {
        etag: etag,
        event: event,
        length: length,
        modified: modified,
        start: dayjs.tz(prerecording.start, event.timezone),
        type: type,
      };
    });
  });

  const prerecordings = (
    await Promise.all(
      (await Promise.all(promises)).flat().slice(0, limit ?? undefined),
    )
  )
    .toSorted((a, b) => a.start.diff(b.start) * (order === "asc" ? 1 : -1))
    .map((prerecording) => ({
      etag: prerecording.etag,
      event: prerecording.event,
      length: prerecording.length,
      modified: prerecording.modified,
      start: prerecording.start.format("YYYY-MM-DDTHH:mm:ss"),
      type: prerecording.type,
    }));

  return {
    prerecordings: { events: events.events, prerecordings: prerecordings },
  };
}
