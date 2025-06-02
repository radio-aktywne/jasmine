import { Dayjs } from "dayjs";

import dayjs from "../../../../../dayjs";
import { UseListSchedulesSuccessState } from "../../../../../hooks/beaver/use-list-schedules/types";

export function getCurrentDatetime(): Dayjs {
  return dayjs.utc();
}

export function getEndDatetime(): Dayjs {
  return getCurrentDatetime().add(1, "month");
}

export function getStartLabel(
  event: UseListSchedulesSuccessState["data"]["schedules"][number]["event"],
  instance: UseListSchedulesSuccessState["data"]["schedules"][number]["instances"][number],
) {
  return instance.start;
}
