import { GetEventSuccessOutput } from "../../../../../actions/beaver/get-event";
import {
  UseUploadPrerecordingFormValidators,
  UseUploadPrerecordingFormValues,
} from "../../../../../hooks/forms/use-upload-prerecording-form";

export type UploadPrerecordingFormData = UseUploadPrerecordingFormValues;

export type UploadPrerecordingFormErrors = {
  [K in keyof UseUploadPrerecordingFormValues]?: string;
};

export type UploadPrerecordingFormValidators =
  UseUploadPrerecordingFormValidators;

export type UploadPrerecordingFormInput = {
  event: GetEventSuccessOutput["data"];
  onUpload?: (
    data: UploadPrerecordingFormData,
  ) => Promise<null | undefined | UploadPrerecordingFormErrors>;
  validate?: UseUploadPrerecordingFormValidators;
};
