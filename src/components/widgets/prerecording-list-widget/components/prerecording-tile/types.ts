import { ListPrerecordingsOutput } from "../../../../../lib/numbat/list-prerecordings";

export type PrerecordingTileInput = {
  prerecording: ListPrerecordingsOutput["prerecordings"]["prerecordings"][number];
};
