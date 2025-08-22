import { GetShowOutput } from "../../../lib/beaver/get-show";
import {
  ListEventsInstancesInput,
  ListEventsInstancesOutput,
} from "../../../lib/wrappers/list-events-instances";

export type UploadPrerecordingWidgetInput = {
  instances: ListEventsInstancesOutput["instances"];
  show: GetShowOutput["show"];
} & ListEventsInstancesInput;
