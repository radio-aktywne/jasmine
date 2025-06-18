import { MessageDescriptor } from "@lingui/core";

import {
  ListEventsInstancesInput,
  ListEventsInstancesOutput,
} from "../../../lib/wrappers/list-events-instances";

export type UseListEventsInstancesInput = {
  end?: ListEventsInstancesInput["end"];
  include?: ListEventsInstancesInput["include"];
  interval?: number;
  order?: ListEventsInstancesInput["order"];
  start?: ListEventsInstancesInput["start"];
  where?: ListEventsInstancesInput["where"];
};

export type UseListEventsInstancesLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListEventsInstancesErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListEventsInstancesSuccessState = {
  data: ListEventsInstancesOutput["instances"];
  error?: never;
  loading: false;
};

export type UseListEventsInstancesState =
  | UseListEventsInstancesErrorState
  | UseListEventsInstancesLoadingState
  | UseListEventsInstancesSuccessState;

export type UseListEventsInstancesOutput = {
  refresh: () => Promise<void>;
} & UseListEventsInstancesState;
