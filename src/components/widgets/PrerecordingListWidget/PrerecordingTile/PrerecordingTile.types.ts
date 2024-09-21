import { ListPrerecordingsData } from "../../../../actions";

export type PrerecordingTileLabels = {
  text: (start: string) => string;
  toasts: {
    delete: {
      success: (start: string) => string;
      error: (start: string) => string;
    };
  };
};

export type PrerecordingTileProps = {
  prerecording: ListPrerecordingsData["prerecordings"][number];
  labels: PrerecordingTileLabels;
};
