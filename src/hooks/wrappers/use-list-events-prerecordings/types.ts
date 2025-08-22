import { MessageDescriptor } from "@lingui/core";

import {
  ListEventsPrerecordingsInput,
  ListEventsPrerecordingsOutput,
} from "../../../lib/wrappers/list-events-prerecordings";

export type UseListEventsPrerecordingsInput = {
  after?: ListEventsPrerecordingsInput["after"];
  before?: ListEventsPrerecordingsInput["before"];
  include?: ListEventsPrerecordingsInput["include"];
  interval?: number;
  limit?: ListEventsPrerecordingsInput["limit"];
  order?: ListEventsPrerecordingsInput["order"];
  timezone?: ListEventsPrerecordingsInput["timezone"];
  where?: ListEventsPrerecordingsInput["where"];
};

export type UseListEventsPrerecordingsLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListEventsPrerecordingsErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListEventsPrerecordingsSuccessState = {
  data: ListEventsPrerecordingsOutput["prerecordings"];
  error?: never;
  loading: false;
};

export type UseListEventsPrerecordingsState =
  | UseListEventsPrerecordingsErrorState
  | UseListEventsPrerecordingsLoadingState
  | UseListEventsPrerecordingsSuccessState;

export type UseListEventsPrerecordingsOutput = {
  refresh: () => Promise<void>;
} & UseListEventsPrerecordingsState;
