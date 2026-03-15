"use client";

import { msg } from "@lingui/core/macro";

import type { ErrorInput, ErrorMetadataUtilityInput } from "../../types";

import { Metadata } from "../../../isomorphic/metadata/components/metadata";
import { PrerecordingsErrorView } from "./error.view";

function getTitle({}: ErrorMetadataUtilityInput = {}) {
  return msg({ message: "Error • jasmine" });
}

export default function PrerecordingsError({ reset }: ErrorInput) {
  return (
    <>
      <Metadata title={getTitle()} />
      <PrerecordingsErrorView reset={reset} />
    </>
  );
}
