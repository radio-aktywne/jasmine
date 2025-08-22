import { components } from "../../../services/numbat";

export type ListPrerecordingsInput = {
  after?: null | string;
  before?: null | string;
  event: string;
  limit?: null | number;
  offset?: null | number;
  order?: "asc" | "desc" | null;
};

export type ListPrerecordingsOutput = {
  prerecordings: components["schemas"]["PrerecordingList"];
};
