import { GetEventSuccessOutput } from "../../../actions/beaver/get-event";

export type UploadPrerecordingWidgetInput = {
  event: GetEventSuccessOutput["data"];
};
