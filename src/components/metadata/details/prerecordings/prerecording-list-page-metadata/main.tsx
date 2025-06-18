"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../../hooks/use-document-metadata";
import { PrerecordingListPageMetadataInput } from "./types";

export function PrerecordingListPageMetadata({}: PrerecordingListPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "jasmine" })),
    title: _(msg({ message: "Prerecordings • jasmine" })),
  });

  return null;
}
