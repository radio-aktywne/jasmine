import { UseFormReturnType } from "@mantine/form";

export type UseUploadPrerecordingFormValues = {
  file: File | null | undefined;
  instance: string | undefined;
};

export type UseUploadPrerecordingFormInitialValues =
  Partial<UseUploadPrerecordingFormValues>;

export type UseUploadPrerecordingFormValidators = {
  [K in keyof UseUploadPrerecordingFormValues]?: (
    value: UseUploadPrerecordingFormValues[K],
  ) => null | string | undefined;
};

export type UseUploadPrerecordingFormDefaultValues =
  Partial<UseUploadPrerecordingFormValues>;

export type UseUploadPrerecordingFormInput = {
  initialValues?: UseUploadPrerecordingFormInitialValues;
  validate?: UseUploadPrerecordingFormValidators;
};

export type UseUploadPrerecordingFormOutput = {
  defaultValues: UseUploadPrerecordingFormDefaultValues;
  form: UseFormReturnType<UseUploadPrerecordingFormValues>;
};
