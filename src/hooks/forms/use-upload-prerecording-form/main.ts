import { useForm } from "@mantine/form";
import "client-only";

import { defaultValues } from "./constants";
import {
  UseUploadPrerecordingFormInput,
  UseUploadPrerecordingFormOutput,
  UseUploadPrerecordingFormValues,
} from "./types";

export function useUploadPrerecordingForm({
  initialValues,
  validate,
}: UseUploadPrerecordingFormInput): UseUploadPrerecordingFormOutput {
  const form = useForm<UseUploadPrerecordingFormValues>({
    initialValues: {
      file:
        initialValues?.file === undefined
          ? defaultValues.file
          : initialValues.file,
      instance: initialValues?.instance ?? defaultValues.instance,
    },
    validate: validate,
  });

  return { defaultValues, form };
}
