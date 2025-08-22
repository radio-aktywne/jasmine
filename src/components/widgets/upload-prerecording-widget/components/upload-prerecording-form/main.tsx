"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, FileInput, Select, Stack } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useUploadPrerecordingForm,
  UseUploadPrerecordingFormValues,
} from "../../../../../hooks/forms/use-upload-prerecording-form";
import { UploadPrerecordingFormInput } from "./types";
import { getInstanceLabel, getInstanceValue } from "./utils";

export function UploadPrerecordingForm({
  instances,
  onUpload,
  validate,
}: UploadPrerecordingFormInput) {
  const [uploading, setUploading] = useState(false);

  const { _ } = useLingui();

  const { form } = useUploadPrerecordingForm({ validate: validate });

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

  const instanceSelectData = instances.map((instance) => ({
    label: getInstanceLabel(instance),
    value: getInstanceValue(instance),
  }));

  return (
    <form onSubmit={form.onSubmit(handleUpload)}>
      <Stack>
        <Select
          data={instanceSelectData}
          label={_(msg({ message: "Instance" }))}
          required={true}
          {...form.getInputProps("instance")}
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
