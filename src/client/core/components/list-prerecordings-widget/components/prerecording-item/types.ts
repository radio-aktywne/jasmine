import type { SetNonNullableDeep } from "type-fest";

import type { ORPCOutputs } from "../../../../../../common/orpc/types/inferred";

type ListShowPrerecordingsOutput =
  ORPCOutputs["core"]["composites"]["listShowPrerecordings"];

type PrerecordingItemEvent = SetNonNullableDeep<
  ListShowPrerecordingsOutput["results"][number]["event"],
  "show"
>;

type PrerecordingItemPrerecording =
  ListShowPrerecordingsOutput["results"][number]["prerecording"];

export type PrerecordingItemInput = {
  event: PrerecordingItemEvent;
  onDelete?: () => Promise<unknown>;
  prerecording: PrerecordingItemPrerecording;
};
