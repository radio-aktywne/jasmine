import { Dayjs } from "dayjs";

import dayjs from "../../../dayjs";

export function getCurrentDatetime(): Dayjs {
  return dayjs.utc();
}

export function getEndDatetime(): Dayjs {
  return getCurrentDatetime().add(1, "month");
}
