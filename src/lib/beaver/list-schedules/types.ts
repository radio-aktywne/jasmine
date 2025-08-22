import { components } from "../../../services/beaver";

export type ListSchedulesInput = {
  end?: null | string;
  include?: null | string;
  limit?: null | number;
  offset?: null | number;
  order?: null | string;
  start?: null | string;
  where?: null | string;
};

export type ListSchedulesOutput = {
  schedules: components["schemas"]["ScheduleList"];
};
