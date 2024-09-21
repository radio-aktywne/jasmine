import { components } from "../../api/emishows";

export type ListSchedulesData = components["schemas"]["ScheduleList"];

export type ListSchedulesProps = {
  start?: string;
  end?: string;
  limit?: number;
  offset?: number;
  where?: string;
  include?: string;
  order?: string;
};
