import { MessageDescriptor } from "@lingui/core";

import { DeletePrerecordingInput as InternalDeletePrerecordingInput } from "../../../lib/numbat/delete-prerecording";

export type DeletePrerecordingInput = {
  event: InternalDeletePrerecordingInput["event"];
  start: InternalDeletePrerecordingInput["start"];
};

export type DeletePrerecordingSuccessOutput = {
  error?: never;
};

export type DeletePrerecordingErrorOutput = {
  error: MessageDescriptor;
};

export type DeletePrerecordingOutput =
  | DeletePrerecordingErrorOutput
  | DeletePrerecordingSuccessOutput;
