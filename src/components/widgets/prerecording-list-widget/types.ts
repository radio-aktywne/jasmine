import { GetShowOutput } from "../../../lib/beaver/get-show";
import {
  ListEventsPrerecordingsInput,
  ListEventsPrerecordingsOutput,
} from "../../../lib/wrappers/list-events-prerecordings";

export type PrerecordingListWidgetInput = {
  prerecordings: ListEventsPrerecordingsOutput["prerecordings"];
  show: GetShowOutput["show"];
} & ListEventsPrerecordingsInput;
