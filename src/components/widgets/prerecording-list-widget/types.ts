import {
  ListPrerecordingsInput,
  ListPrerecordingsOutput,
} from "../../../lib/numbat/list-prerecordings";

export type PrerecordingListWidgetInput = {
  event: ListPrerecordingsInput["event"];
  perPage?: number;
  prerecordings: ListPrerecordingsOutput["prerecordings"];
};
