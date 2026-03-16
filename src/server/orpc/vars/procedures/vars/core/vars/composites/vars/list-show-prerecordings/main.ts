import { call } from "@orpc/server";
import { omit } from "es-toolkit/object";

import { dayjs } from "../../../../../../../../../../common/dates/vars/dayjs";
import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { prerecordings } from "../../../prerecordings";
import { shows } from "../../../shows";

export const listShowPrerecordings =
  orpcServerRootBase.core.composites.listShowPrerecordings.handler(
    async ({ input }) => {
      const showsGetData = await call(shows.get, {
        id: input.id,
        include: { events: { where: { type: "prerecorded" } } },
      });

      const perEventData = await Promise.all(
        showsGetData.events!.map(async (event) => {
          const data = await call(prerecordings.list, {
            after:
              input.after &&
              dayjs
                .utc(input.after)
                .tz(event.timezone)
                .format("YYYY-MM-DDTHH:mm:ss"),
            before:
              input.before &&
              dayjs
                .utc(input.before)
                .tz(event.timezone)
                .format("YYYY-MM-DDTHH:mm:ss"),
            event: event.id,
            limit: input.limit,
            order: input.order,
          });

          return { data: data, event: event };
        }),
      );

      const count = perEventData.reduce((sum, { data }) => sum + data.count, 0);

      const results = await Promise.all(
        perEventData
          .flatMap((item) =>
            item.data.prerecordings.map((prerecording) => ({
              event: item.event,
              start: dayjs.tz(prerecording.start, item.event.timezone),
            })),
          )
          .toSorted(
            (a, b) => a.start.diff(b.start) * (input.order === "asc" ? 1 : -1),
          )
          .slice(0, input.limit ?? undefined)
          .map(async (data) => {
            const start = data.start.format("YYYY-MM-DDTHH:mm:ss");

            const { response: prerecordingsEventStartHeaddownloadResponse } =
              await state.current.apis.numbat.prerecordingsEventStartHeaddownload(
                { path: { event: data.event.id, start: start } },
              );

            const headers = prerecordingsEventStartHeaddownloadResponse.headers;

            return {
              event: {
                ...data.event,
                show: omit(showsGetData, ["events"]),
              },
              prerecording: {
                etag: headers.get("ETag")!,
                length: headers.get("Content-Length")!,
                modified: headers.get("Last-Modified")!,
                start: start,
                type: headers.get("Content-Type")!,
              },
            };
          }),
      );

      return { count: count, results: results };
    },
  );
