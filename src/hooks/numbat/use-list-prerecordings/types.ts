import { MessageDescriptor } from "@lingui/core";

import {
  ListPrerecordingsInput,
  ListPrerecordingsOutput,
} from "../../../lib/numbat/list-prerecordings";

export type UseListPrerecordingsInput = {
  after?: ListPrerecordingsInput["after"];
  before?: ListPrerecordingsInput["before"];
  event: ListPrerecordingsInput["event"];
  interval?: number;
  limit?: ListPrerecordingsInput["limit"];
  offset?: ListPrerecordingsInput["offset"];
  order?: ListPrerecordingsInput["order"];
};

export type UseListPrerecordingsLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListPrerecordingsErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListPrerecordingsSuccessState = {
  data: ListPrerecordingsOutput["prerecordings"];
  error?: never;
  loading: false;
};

export type UseListPrerecordingsState =
  | UseListPrerecordingsErrorState
  | UseListPrerecordingsLoadingState
  | UseListPrerecordingsSuccessState;

export type UseListPrerecordingsOutput = {
  refresh: () => Promise<void>;
} & UseListPrerecordingsState;
