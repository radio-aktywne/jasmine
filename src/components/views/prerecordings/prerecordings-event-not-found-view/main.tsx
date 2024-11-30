"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Title } from "@mantine/core";

import { PrerecordingsEventNotFoundViewInput } from "./types";

export function PrerecordingsEventNotFoundView({}: PrerecordingsEventNotFoundViewInput) {
  const { _ } = useLingui();

  return <Title>{_(msg({ message: "Event not found." }))}</Title>;
}
