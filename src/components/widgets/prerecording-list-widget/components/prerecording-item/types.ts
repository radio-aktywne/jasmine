import { ListEventsPrerecordingsOutput } from "../../../../../lib/wrappers/list-events-prerecordings";

export type PrerecordingItemInput = {
  onDelete?: () => void;
  prerecording: ListEventsPrerecordingsOutput["prerecordings"]["prerecordings"][number];
  timezone?: string;
};
