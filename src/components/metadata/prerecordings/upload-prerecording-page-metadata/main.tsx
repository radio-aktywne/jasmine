"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { UploadPrerecordingPageMetadataInput } from "./types";

export function UploadPrerecordingPageMetadata({}: UploadPrerecordingPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "jasmine" })),
    title: _(msg({ message: "Upload prerecording • jasmine" })),
  });

  return null;
}
