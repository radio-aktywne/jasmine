"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { PrerecordingsPageMetadataInput } from "./types";

export function PrerecordingsPageMetadata({}: PrerecordingsPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "jasmine" })),
    title: _(msg({ message: "Prerecordings • jasmine" })),
  });

  return null;
}
