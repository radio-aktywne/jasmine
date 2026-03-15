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

      const mappedPrerecordingsListData = await Promise.all(
        showsGetData.events!.map(async (event) => {
          const prerecordingsListData = await call(prerecordings.list, {
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
            limit: null,
          });

          return prerecordingsListData.prerecordings.map((prerecording) => ({
            event: event,
            start: dayjs.tz(prerecording.start, event.timezone),
          }));
        }),
      );

      const results = await Promise.all(
        mappedPrerecordingsListData
          .flat()
          .toSorted((a, b) => a.start.diff(b.start))
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

      return { results: results };
    },
  );
