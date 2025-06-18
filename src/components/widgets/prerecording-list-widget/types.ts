import { UseListEventsPrerecordingsInput } from "../../../hooks/wrappers/use-list-events-prerecordings";
import { GetShowOutput } from "../../../lib/beaver/get-show";
import { ListEventsPrerecordingsOutput } from "../../../lib/wrappers/list-events-prerecordings";

export type PrerecordingListWidgetInput = {
  prerecordings: ListEventsPrerecordingsOutput["prerecordings"];
  show: GetShowOutput["show"];
} & UseListEventsPrerecordingsInput;
