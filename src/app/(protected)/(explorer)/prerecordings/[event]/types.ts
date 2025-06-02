import { PropsWithChildren } from "react";

export type PrerecordingListEventNotFoundInput = {
  [key: string]: never;
};

export type PrerecordingListLayoutInput = PropsWithChildren;

type PrerecordingListPageParams = {
  event: string;
};

export type PrerecordingListPageInput = {
  params: PrerecordingListPageParams;
};
