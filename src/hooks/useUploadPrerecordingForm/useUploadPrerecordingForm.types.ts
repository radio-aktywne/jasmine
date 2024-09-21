import { GetEventData } from "../../actions";

export type UseUploadPrerecordingFormInitialValues = {
  start?: string;
  file?: File | null;
};

export type UseUploadPrerecordingFormValidators = {
  start?: (value: string | undefined) => string | null | undefined;
  file?: (value: File | null | undefined) => string | null | undefined;
};

export type UseUploadPrerecordingFormProps = {
  event: GetEventData;
  initialValues?: UseUploadPrerecordingFormInitialValues;
  validate?: UseUploadPrerecordingFormValidators;
};
