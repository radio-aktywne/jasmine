import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type UploadPrerecordingFormSchema = typeof Schemas.Values;

export type UploadPrerecordingFormValues =
  UseFormValues<UploadPrerecordingFormSchema>;

export type UploadPrerecordingFormInitialValues =
  UseFormInitialValues<UploadPrerecordingFormSchema>;

export type UploadPrerecordingFormOnError = UseFormOnError;

export type UploadPrerecordingFormSubmitInput =
  UseFormSubmitInput<UploadPrerecordingFormSchema>;

export type UploadPrerecordingFormOnSubmit =
  UseFormOnSubmit<UploadPrerecordingFormSchema>;

export type UploadPrerecordingFormInput = {
  initialValues: UploadPrerecordingFormValues;
  onError?: UploadPrerecordingFormOnError;
  onShowChange?: (value: null | string) => void;
  onSubmit: UploadPrerecordingFormOnSubmit;
  show?: null | string;
};
