import { MessageDescriptor } from "@lingui/core";

import {
  ListEventsInstancesInput as InternalListEventsInstancesInput,
  ListEventsInstancesOutput as InternalListEventsInstancesOutput,
} from "../../../lib/wrappers/list-events-instances";

export type ListEventsInstancesInput = {
  end?: InternalListEventsInstancesInput["end"];
  include?: InternalListEventsInstancesInput["include"];
  order?: InternalListEventsInstancesInput["order"];
  start?: InternalListEventsInstancesInput["start"];
  where?: InternalListEventsInstancesInput["where"];
};

export type ListEventsInstancesSuccessOutput = {
  data: InternalListEventsInstancesOutput["instances"];
  error?: never;
};

export type ListEventsInstancesErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListEventsInstancesOutput =
  | ListEventsInstancesErrorOutput
  | ListEventsInstancesSuccessOutput;
