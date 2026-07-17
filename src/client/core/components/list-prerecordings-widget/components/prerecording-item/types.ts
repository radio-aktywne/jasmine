import type { ORPCOutputs } from "../../../../../../common/orpc/types/inferred";

type ListShowPrerecordingsOutput =
  ORPCOutputs["core"]["composites"]["listShowPrerecordings"];

type PrerecordingItemEvent =
  ListShowPrerecordingsOutput["results"][number]["event"];

type PrerecordingItemPrerecording =
  ListShowPrerecordingsOutput["results"][number]["prerecording"];

export type PrerecordingItemInput = {
  event: PrerecordingItemEvent;
  onDelete?: () => Promise<unknown>;
  prerecording: PrerecordingItemPrerecording;
};
