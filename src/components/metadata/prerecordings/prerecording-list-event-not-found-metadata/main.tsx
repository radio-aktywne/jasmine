"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { PrerecordingListEventNotFoundMetadataInput } from "./types";

export function PrerecordingListEventNotFoundMetadata({}: PrerecordingListEventNotFoundMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "jasmine" })),
    title: _(msg({ message: "Event not found • jasmine" })),
  });

  return null;
}
