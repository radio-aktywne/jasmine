"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { labels } from "../../../config/labels";
import { useToasts } from "../../../hooks";
import {
  UploadPrerecordingForm,
  UploadPrerecordingFormData,
} from "./UploadPrerecordingForm";
import { UploadPrerecordingWidgetProps } from "./UploadPrerecordingWidget.types";

export function UploadPrerecordingWidget({
  event,
}: UploadPrerecordingWidgetProps) {
  const router = useRouter();

  const { success, error } = useToasts();

  const handleNormalizedUpload = useCallback(
    async (start: string, file: File) => {
      const response = await fetch(`/api/prerecordings/${event.id}/${start}`, {
        method: "PUT",
        body: file,
      });

      if (!response.ok) {
        error(labels.widgets.uploadPrerecording.toasts.upload.error);

        const data = await response.json();
        return data["error"] as string;
      }

      success(labels.widgets.uploadPrerecording.toasts.upload.success(start));
      router.push(`/prerecordings/${event.id}`);
    },
    [event.id, error, success, router],
  );

  const handleUpload = useCallback(
    async (data: UploadPrerecordingFormData) => {
      if (data.start === undefined || data.start === "")
        return {
          start:
            labels.widgets.uploadPrerecording.form.fields.start.errors.missing,
        };

      if (data.file === undefined || data.file === null)
        return {
          file: labels.widgets.uploadPrerecording.form.fields.file.errors
            .missing,
        };

      const message = await handleNormalizedUpload(data.start, data.file);

      return message ? { start: message, file: message } : null;
    },
    [handleNormalizedUpload],
  );

  return (
    <UploadPrerecordingForm
      event={event}
      labels={labels.widgets.uploadPrerecording.form}
      onUpload={handleUpload}
    />
  );
}
