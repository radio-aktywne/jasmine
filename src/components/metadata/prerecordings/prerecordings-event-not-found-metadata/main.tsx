"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { PrerecordingsEventNotFoundMetadataInput } from "./types";

export function PrerecordingsEventNotFoundMetadata({}: PrerecordingsEventNotFoundMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "jasmine" })),
    title: _(msg({ message: "Event not found • jasmine" })),
  });

  return null;
}
