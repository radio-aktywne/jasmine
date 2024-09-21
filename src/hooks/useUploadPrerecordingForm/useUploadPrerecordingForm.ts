import "client-only";

import { useForm } from "@mantine/form";
import dayjs from "../../utils/dayjs";
import { useListSchedules } from "../useListSchedules";
import { UseUploadPrerecordingFormProps } from "./useUploadPrerecordingForm.types";

export function useUploadPrerecordingForm({
  event,
  initialValues,
  validate,
}: UseUploadPrerecordingFormProps) {
  const defaultValues = {
    start: undefined,
    file: undefined,
  };

  const form = useForm({
    initialValues: {
      start:
        initialValues?.start === undefined
          ? defaultValues.start
          : initialValues.start,
      file:
        initialValues?.file === undefined
          ? defaultValues.file
          : initialValues.file,
    },
    validate: validate,
  });

  const end = dayjs.utc().add(1, "month");
  const where = { id: event.id };

  const { data: schedules } = useListSchedules({
    end: end.format("YYYY-MM-DDTHH:mm:ss"),
    limit: 1000,
    where: JSON.stringify(where),
  });

  const startValues =
    schedules?.schedules
      .flatMap((schedule) =>
        schedule.instances.map((instance) => instance.start),
      )
      .toSorted() ?? [];

  return { form, defaultValues, startValues, loading: schedules === undefined };
}
