import { components } from "../../../services/numbat";

export type ListPrerecordingsInput = {
  after?: string;
  before?: string;
  event: string;
  limit?: number;
  offset?: number;
  order?: "asc" | "desc";
};

export type ListPrerecordingsOutput = {
  prerecordings: components["schemas"]["PrerecordingList"];
};
