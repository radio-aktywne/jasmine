import {
  UseUploadPrerecordingFormValidators,
  UseUploadPrerecordingFormValues,
} from "../../../../../hooks/forms/use-upload-prerecording-form";
import { ListEventsInstancesOutput } from "../../../../../lib/wrappers/list-events-instances";

export type UploadPrerecordingFormData = UseUploadPrerecordingFormValues;

export type UploadPrerecordingFormErrors = {
  [K in keyof UseUploadPrerecordingFormValues]?: string;
};

export type UploadPrerecordingFormValidators =
  UseUploadPrerecordingFormValidators;

export type UploadPrerecordingFormInput = {
  instances: ListEventsInstancesOutput["instances"];
  onUpload?: (
    data: UploadPrerecordingFormData,
  ) => Promise<null | undefined | UploadPrerecordingFormErrors>;
  validate?: UseUploadPrerecordingFormValidators;
};
