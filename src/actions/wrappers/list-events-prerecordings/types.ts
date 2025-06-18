import { MessageDescriptor } from "@lingui/core";

import {
  ListEventsPrerecordingsInput as InternalListEventsPrerecordingsInput,
  ListEventsPrerecordingsOutput as InternalListEventsPrerecordingsOutput,
} from "../../../lib/wrappers/list-events-prerecordings";

export type ListEventsPrerecordingsInput = {
  after?: InternalListEventsPrerecordingsInput["after"];
  before?: InternalListEventsPrerecordingsInput["before"];
  include?: InternalListEventsPrerecordingsInput["include"];
  order?: InternalListEventsPrerecordingsInput["order"];
  where?: InternalListEventsPrerecordingsInput["where"];
};

export type ListEventsPrerecordingsSuccessOutput = {
  data: InternalListEventsPrerecordingsOutput["prerecordings"];
  error?: never;
};

export type ListEventsPrerecordingsErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListEventsPrerecordingsOutput =
  | ListEventsPrerecordingsErrorOutput
  | ListEventsPrerecordingsSuccessOutput;
