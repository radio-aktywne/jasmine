import { components } from "../../api/emilounge";

export type ListPrerecordingsData = components["schemas"]["PrerecordingList"];

export type ListPrerecordingsProps = {
  event: string;
  after?: string;
  before?: string;
  limit?: number;
  offset?: number;
  order?: "asc" | "desc";
};
