import { GetEventData } from "../../../../actions";
import { UseUploadPrerecordingFormValidators } from "../../../../hooks";

export type UploadPrerecordingFormLabels = {
  fields: {
    start: {
      label: string;
      option: (start: string) => string;
    };
    file: {
      label: string;
    };
  };
  buttons: {
    upload: {
      label: string;
    };
  };
};

export type UploadPrerecordingFormValidators =
  UseUploadPrerecordingFormValidators;

export type UploadPrerecordingFormData = {
  start: string | undefined;
  file: File | null | undefined;
};

export type UploadPrerecordingFormErrors = {
  start?: string;
  file?: string;
};

export type UploadPrerecordingFormProps = {
  event: GetEventData;
  labels: UploadPrerecordingFormLabels;
  validate?: UploadPrerecordingFormValidators;
  onUpload?: (
    data: UploadPrerecordingFormData,
  ) => Promise<UploadPrerecordingFormErrors | null | undefined>;
};
