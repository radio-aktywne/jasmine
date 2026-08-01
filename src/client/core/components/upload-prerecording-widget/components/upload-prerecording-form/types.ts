import type { HasRequiredKeys } from "type-fest";
import type * as z from "zod";

import type {
  UseFormErrorInput,
  UseFormErrors,
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitErrorOutput,
  UseFormSubmitInput,
  UseFormSubmitOutput,
  UseFormSubmitSuccessOutput,
} from "../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type UploadPrerecordingFormInputSchema = typeof Schemas.Input;

export type UploadPrerecordingFormOutputSchema = typeof Schemas.Output;

export type UploadPrerecordingFormInitialValues = UseFormInitialValues<
  z.output<UploadPrerecordingFormInputSchema>
>;

export type UploadPrerecordingFormErrorInput = UseFormErrorInput<
  z.output<UploadPrerecordingFormInputSchema>
>;

export type UploadPrerecordingFormOnError = UseFormOnError<
  z.output<UploadPrerecordingFormInputSchema>
>;

export type UploadPrerecordingFormOnShowChange = (show: null | string) => void;

export type UploadPrerecordingFormSubmitInput = UseFormSubmitInput<
  z.output<UploadPrerecordingFormOutputSchema>
>;

export type UploadPrerecordingFormErrors = UseFormErrors<
  z.input<UploadPrerecordingFormInputSchema>
>;

export type UploadPrerecordingFormSubmitErrorOutput = UseFormSubmitErrorOutput<
  z.input<UploadPrerecordingFormInputSchema>
>;

export type UploadPrerecordingFormSubmitSuccessOutput =
  UseFormSubmitSuccessOutput<z.output<UploadPrerecordingFormInputSchema>>;

export type UploadPrerecordingFormSubmitOutput = UseFormSubmitOutput<
  z.input<UploadPrerecordingFormInputSchema>,
  z.output<UploadPrerecordingFormInputSchema>
>;

export type UploadPrerecordingFormOnSubmit = UseFormOnSubmit<
  z.input<UploadPrerecordingFormInputSchema>,
  z.output<UploadPrerecordingFormInputSchema>,
  z.output<UploadPrerecordingFormOutputSchema>
>;

export type UploadPrerecordingFormShow = null | string;

export type UploadPrerecordingFormInput = (HasRequiredKeys<
  z.output<UploadPrerecordingFormInputSchema>
> extends true
  ? { initialValues: UploadPrerecordingFormInitialValues }
  : { initialValues?: UploadPrerecordingFormInitialValues }) & {
  onError?: UploadPrerecordingFormOnError;
  onShowChange?: UploadPrerecordingFormOnShowChange;
  onSubmit: UploadPrerecordingFormOnSubmit;
  show?: UploadPrerecordingFormShow;
};
