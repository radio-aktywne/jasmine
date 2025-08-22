import {
  ListSchedulesInput,
  ListSchedulesOutput,
} from "../../beaver/list-schedules";

export type ListEventsInstancesInstance = {
  end: ListSchedulesOutput["schedules"]["schedules"][number]["instances"][number]["end"];
  event: ListSchedulesOutput["schedules"]["schedules"][number]["event"];
  start: ListSchedulesOutput["schedules"]["schedules"][number]["instances"][number]["start"];
};

export type ListEventsInstancesInput = {
  end?: ListSchedulesInput["end"];
  include?: ListSchedulesInput["include"];
  order?: "asc" | "desc";
  start?: ListSchedulesInput["start"];
  where?: ListSchedulesInput["where"];
};

export type ListEventsInstancesOutput = {
  instances: ListEventsInstancesInstance[];
};
