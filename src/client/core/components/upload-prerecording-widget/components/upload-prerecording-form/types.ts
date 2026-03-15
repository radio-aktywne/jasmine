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
  id: string;
  initialValues: UploadPrerecordingFormValues;
  onError?: UploadPrerecordingFormOnError;
  onSubmit: UploadPrerecordingFormOnSubmit;
};
