"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, FileInput, Loader, Select, Stack } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useUploadPrerecordingForm,
  UseUploadPrerecordingFormValues,
} from "../../../../../hooks/forms/use-upload-prerecording-form";
import { useListEventsInstances } from "../../../../../hooks/wrappers/use-list-events-instances";
import { datetimeFormat } from "./constants";
import { UploadPrerecordingFormInput } from "./types";
import { getEndDatetime, getInstanceLabel, getInstanceValue } from "./utils";

export function UploadPrerecordingForm({
  onUpload,
  show,
  validate,
}: UploadPrerecordingFormInput) {
  const [uploading, setUploading] = useState(false);

  const { _ } = useLingui();

  const { data: instances, loading: instancesLoading } = useListEventsInstances(
    {
      end: getEndDatetime().format(datetimeFormat),
      where: JSON.stringify({ show: { id: show.id }, type: "prerecorded" }),
    },
  );

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

  if (instancesLoading) return <Loader />;

  const instanceSelectData = instances?.map((instance) => ({
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
