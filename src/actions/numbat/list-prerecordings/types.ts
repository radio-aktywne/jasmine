import { MessageDescriptor } from "@lingui/core";

import {
  ListPrerecordingsInput as InternalListPrerecordingsInput,
  ListPrerecordingsOutput as InternalListPrerecordingsOutput,
} from "../../../lib/numbat/list-prerecordings";

export type ListPrerecordingsInput = {
  after?: InternalListPrerecordingsInput["after"];
  before?: InternalListPrerecordingsInput["before"];
  event: InternalListPrerecordingsInput["event"];
  limit?: InternalListPrerecordingsInput["limit"];
  offset?: InternalListPrerecordingsInput["offset"];
  order?: InternalListPrerecordingsInput["order"];
};

export type ListPrerecordingsSuccessOutput = {
  data: InternalListPrerecordingsOutput["prerecordings"];
  error?: never;
};

export type ListPrerecordingsErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListPrerecordingsOutput =
  | ListPrerecordingsErrorOutput
  | ListPrerecordingsSuccessOutput;
