import { Dayjs } from "dayjs";

import dayjs from "../../../../../dayjs";
import { UseListEventsInstancesSuccessState } from "../../../../../hooks/wrappers/use-list-events-instances/types";

export function getCurrentDatetime(): Dayjs {
  return dayjs.utc();
}

export function getEndDatetime(): Dayjs {
  return getCurrentDatetime().add(1, "month");
}

export function getInstanceLabel(
  instance: UseListEventsInstancesSuccessState["data"][number],
) {
  const start = dayjs.tz(instance.start, instance.event.timezone);
  return start.local().format("LLL");
}

export function getInstanceValue(
  instance: UseListEventsInstancesSuccessState["data"][number],
) {
  return `${instance.event.id}/${instance.start}`;
}
