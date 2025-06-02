import { ListPrerecordingsOutput } from "../../../../../lib/numbat/list-prerecordings";

export type PrerecordingItemInput = {
  prerecording: ListPrerecordingsOutput["prerecordings"]["prerecordings"][number];
};
