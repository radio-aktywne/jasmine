"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, FileInput, Loader, Select, Stack } from "@mantine/core";
import { useCallback, useState } from "react";

import { useListSchedules } from "../../../../../hooks/beaver/use-list-schedules";
import {
  useUploadPrerecordingForm,
  UseUploadPrerecordingFormValues,
} from "../../../../../hooks/forms/use-upload-prerecording-form";
import { datetimeFormat } from "./constants";
import { UploadPrerecordingFormInput } from "./types";
import { getEndDatetime, getStartLabel } from "./utils";

export function UploadPrerecordingForm({
  event,
  onUpload,
  validate,
}: UploadPrerecordingFormInput) {
  const [uploading, setUploading] = useState(false);

  const { _ } = useLingui();

  const { data: schedules, loading: schedulesLoading } = useListSchedules({
    end: getEndDatetime().format(datetimeFormat),
    where: JSON.stringify({ id: event.id }),
  });

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

  if (schedulesLoading) return <Loader />;

  const startSelectData = schedules?.schedules.flatMap((schedule) =>
    schedule.instances.map((instance) => ({
      label: getStartLabel(schedule.event, instance),
      value: instance.start,
    })),
  );

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
