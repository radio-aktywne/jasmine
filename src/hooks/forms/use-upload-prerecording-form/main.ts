import { useForm } from "@mantine/form";
import "client-only";
import { useMemo } from "react";

import { useListSchedules } from "../../beaver/use-list-schedules";
import { datetimeFormat, defaultValues, schedulesLimit } from "./constants";
import {
  UseUploadPrerecordingFormInput,
  UseUploadPrerecordingFormOutput,
  UseUploadPrerecordingFormValues,
} from "./types";
import { getEndDatetime } from "./utils";

export function useUploadPrerecordingForm({
  event,
  initialValues,
  validate,
}: UseUploadPrerecordingFormInput): UseUploadPrerecordingFormOutput {
  const form = useForm<UseUploadPrerecordingFormValues>({
    initialValues: {
      file:
        initialValues?.file === undefined
          ? defaultValues.file
          : initialValues.file,
      start:
        initialValues?.start === undefined
          ? defaultValues.start
          : initialValues.start,
    },
    validate: validate,
  });

  const { data: schedules, loading: schedulesLoading } = useListSchedules({
    end: getEndDatetime().format(datetimeFormat),
    limit: schedulesLimit,
    where: JSON.stringify({ id: event.id }),
  });

  const allowedValues = useMemo(
    () => ({
      start:
        schedules?.schedules
          .flatMap((schedule) =>
            schedule.instances.map((instance) => instance.start),
          )
          .toSorted() ?? [],
    }),
    [schedules],
  );

  return {
    allowedValues,
    defaultValues,
    form,
    loading: schedulesLoading,
  };
}
