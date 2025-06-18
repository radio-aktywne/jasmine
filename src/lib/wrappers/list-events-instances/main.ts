import "server-only";

import dayjs from "../../../dayjs";
import { BeaverError } from "../../beaver/errors";
import { listSchedules } from "../../beaver/list-schedules";
import { ListEventsInstancesError } from "./errors";
import { ListEventsInstancesInput, ListEventsInstancesOutput } from "./types";

export async function listEventsInstances({
  end,
  include,
  order = "asc",
  start,
  where,
}: ListEventsInstancesInput): Promise<ListEventsInstancesOutput> {
  const { schedules } = await (async () => {
    try {
      return await listSchedules({
        end: end,
        include: include,
        start: start,
        where: where,
      });
    } catch (error) {
      if (error instanceof BeaverError) throw new ListEventsInstancesError();
      throw error;
    }
  })();

  const instances = schedules.schedules
    .flatMap((schedule) =>
      schedule.instances.map((instance) => ({
        end: dayjs.tz(instance.end, schedule.event.timezone),
        event: schedule.event,
        start: dayjs.tz(instance.start, schedule.event.timezone),
      })),
    )
    .toSorted((a, b) => a.start.diff(b.start) * (order === "asc" ? 1 : -1))
    .map((instance) => ({
      end: instance.end.format("YYYY-MM-DDTHH:mm:ss"),
      event: instance.event,
      start: instance.start.format("YYYY-MM-DDTHH:mm:ss"),
    }));

  return { instances: instances };
}
