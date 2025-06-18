import {
  UseUploadPrerecordingFormValidators,
  UseUploadPrerecordingFormValues,
} from "../../../../../hooks/forms/use-upload-prerecording-form";
import { GetShowOutput } from "../../../../../lib/beaver/get-show";

export type UploadPrerecordingFormData = UseUploadPrerecordingFormValues;

export type UploadPrerecordingFormErrors = {
  [K in keyof UseUploadPrerecordingFormValues]?: string;
};

export type UploadPrerecordingFormValidators =
  UseUploadPrerecordingFormValidators;

export type UploadPrerecordingFormInput = {
  onUpload?: (
    data: UploadPrerecordingFormData,
  ) => Promise<null | undefined | UploadPrerecordingFormErrors>;
  show: GetShowOutput["show"];
  validate?: UseUploadPrerecordingFormValidators;
};
