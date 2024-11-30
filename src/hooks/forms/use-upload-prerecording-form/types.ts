import { UseFormReturnType } from "@mantine/form";

import { GetEventSuccessOutput } from "../../../actions/beaver/get-event";

export type UseUploadPrerecordingFormValues = {
  file: File | null | undefined;
  start: string | undefined;
};

export type UseUploadPrerecordingFormInitialValues =
  Partial<UseUploadPrerecordingFormValues>;

export type UseUploadPrerecordingFormValidators = {
  [K in keyof UseUploadPrerecordingFormValues]?: (
    value: UseUploadPrerecordingFormValues[K],
  ) => null | string | undefined;
};

export type UseUploadPrerecordingFormAllowedValues = {
  start: string[];
};

export type UseUploadPrerecordingFormDefaultValues =
  Partial<UseUploadPrerecordingFormValues>;

export type UseUploadPrerecordingFormInput = {
  event: GetEventSuccessOutput["data"];
  initialValues?: UseUploadPrerecordingFormInitialValues;
  validate?: UseUploadPrerecordingFormValidators;
};

export type UseUploadPrerecordingFormOutput = {
  allowedValues: UseUploadPrerecordingFormAllowedValues;
  defaultValues: UseUploadPrerecordingFormDefaultValues;
  form: UseFormReturnType<UseUploadPrerecordingFormValues>;
  loading: boolean;
};
