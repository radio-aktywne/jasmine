import { GetEventData, ListPrerecordingsData } from "../../../actions";

export type PrerecordingListWidgetProps = {
  event: GetEventData;
  prerecordings: ListPrerecordingsData;
  page: number;
  perPage: number;
};
