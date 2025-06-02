"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Title } from "@mantine/core";

import { PrerecordingListEventNotFoundViewInput } from "./types";

export function PrerecordingListEventNotFoundView({}: PrerecordingListEventNotFoundViewInput) {
  const { _ } = useLingui();

  return <Title>{_(msg({ message: "Event not found." }))}</Title>;
}
