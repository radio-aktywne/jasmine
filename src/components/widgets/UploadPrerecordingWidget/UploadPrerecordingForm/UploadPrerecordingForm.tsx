"use client";

import { Button, FileInput, Loader, Select, Stack } from "@mantine/core";
import { useCallback, useState } from "react";
import { useUploadPrerecordingForm } from "../../../../hooks";
import {
  UploadPrerecordingFormData,
  UploadPrerecordingFormProps,
} from "./UploadPrerecordingForm.types";

export function UploadPrerecordingForm({
  event,
  labels,
  validate,
  onUpload,
}: UploadPrerecordingFormProps) {
  const [uploading, setUploading] = useState(false);

  const { form, startValues, loading } = useUploadPrerecordingForm({
    event,
    validate,
  });

  const formSetErrors = form.setErrors;

  const handleUpload = useCallback(
    async (data: UploadPrerecordingFormData) => {
      setUploading(true);
      try {
        const errors = await onUpload?.(data);
        if (errors != null) formSetErrors(errors);
      } finally {
        setUploading(false);
      }
    },
    [onUpload, formSetErrors],
  );

  if (loading) return <Loader />;

  const startSelectData = startValues.map((start) => ({
    value: start,
    label: labels.fields.start.option(start),
  }));

  return (
    <form onSubmit={form.onSubmit(handleUpload)}>
      <Stack>
        <Select
          label={labels.fields.start.label}
          data={startSelectData}
          required={true}
          {...form.getInputProps("start")}
        />
        <FileInput
          label={labels.fields.file.label}
          required={true}
          {...form.getInputProps("file")}
        />
        <Button type="submit" loading={uploading}>
          {labels.buttons.upload.label}
        </Button>
      </Stack>
    </form>
  );
}
