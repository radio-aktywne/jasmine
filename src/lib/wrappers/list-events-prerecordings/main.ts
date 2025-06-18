import "server-only";

import dayjs from "../../../dayjs";
import { BeaverError } from "../../beaver/errors";
import { listEvents } from "../../beaver/list-events";
import { NumbatError } from "../../numbat/errors";
import { headPrerecording } from "../../numbat/head-prerecording";
import { listPrerecordings } from "../../numbat/list-prerecordings";
import { ListEventsPrerecordingsError } from "./errors";
import {
  ListEventsPrerecordingsInput,
  ListEventsPrerecordingsOutput,
} from "./types";

export async function listEventsPrerecordings({
  after,
  before,
  include,
  order = "desc",
  where,
}: ListEventsPrerecordingsInput): Promise<ListEventsPrerecordingsOutput> {
  const { events } = await (async () => {
    try {
      return listEvents({ include: include, where: where });
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
          after: after,
          before: before,
          event: event.id,
          order: order,
        });
      } catch (error) {
        if (error instanceof NumbatError)
          throw new ListEventsPrerecordingsError();
        throw error;
      }
    })();

    const promises = prerecordings.prerecordings.map(async (prerecording) => {
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

    return await Promise.all(promises);
  });

  const prerecordings = (await Promise.all(promises))
    .flat()
    .toSorted((a, b) => a.start.diff(b.start) * (order === "asc" ? 1 : -1))
    .map((prerecording) => ({
      etag: prerecording.etag,
      event: prerecording.event,
      length: prerecording.length,
      modified: prerecording.modified,
      start: prerecording.start.format("YYYY-MM-DDTHH:mm:ss"),
      type: prerecording.type,
    }));

  return { prerecordings: prerecordings };
}
