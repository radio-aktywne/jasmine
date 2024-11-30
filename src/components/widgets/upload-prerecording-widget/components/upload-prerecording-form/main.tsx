"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, FileInput, Loader, Select, Stack } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useUploadPrerecordingForm,
  UseUploadPrerecordingFormValues,
} from "../../../../../hooks/forms/use-upload-prerecording-form";
import { UploadPrerecordingFormInput } from "./types";
import { getStartLabel } from "./utils";

export function UploadPrerecordingForm({
  event,
  onUpload,
  validate,
}: UploadPrerecordingFormInput) {
  const [uploading, setUploading] = useState(false);

  const { _ } = useLingui();

  const { allowedValues, form, loading } = useUploadPrerecordingForm({
    event: event,
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleUpload = useCallback(
    async (data: UseUploadPrerecordingFormValues) => {
      setUploading(true);
      try {
        const errors = await onUpload?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setUploading(false);
      }
    },
    [formSetErrors, onUpload],
  );

  if (loading) return <Loader />;

  const startSelectData = allowedValues.start.map((value) => ({
    label: getStartLabel(value),
    value: value,
  }));

  return (
    <form onSubmit={form.onSubmit(handleUpload)}>
      <Stack>
        <Select
          data={startSelectData}
          label={_(msg({ message: "Start" }))}
          required={true}
          {...form.getInputProps("start")}
        />
        <FileInput
          label={_(msg({ message: "File" }))}
          required={true}
          {...form.getInputProps("file")}
        />
        <Button loading={uploading} type="submit">
          {_(msg({ message: "Upload" }))}
        </Button>
      </Stack>
    </form>
  );
}
