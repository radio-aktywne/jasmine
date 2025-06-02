import { PropsWithChildren } from "react";

export type PrerecordingsEventNotFoundInput = {
  [key: string]: never;
};

export type PrerecordingsLayoutInput = PropsWithChildren;

type PrerecordingsPageParams = {
  event: string;
};

export type PrerecordingsPageInput = {
  params: PrerecordingsPageParams;
};
