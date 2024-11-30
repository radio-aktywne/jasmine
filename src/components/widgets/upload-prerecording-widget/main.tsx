"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useToasts } from "../../../hooks/use-toasts";
import {
  UploadPrerecordingForm,
  UploadPrerecordingFormData,
} from "./components/upload-prerecording-form";
import { UploadPrerecordingWidgetInput } from "./types";

export function UploadPrerecordingWidget({
  event,
}: UploadPrerecordingWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const handleUploadAfterValidation = useCallback(
    async (start: string, file: File) => {
      const response = await fetch(`/api/prerecordings/${event.id}/${start}`, {
        body: file,
        method: "PUT",
      });

      if (!response.ok) {
        const data = await response.json();
        const error = _(data["error"]);

        toasts.error(error);
        return { file: error, start: error };
      }

      toasts.success(_(msg({ message: "Prerecording uploaded successfully" })));
      router.push(`/prerecordings/${event.id}`);
    },
    [_, event, router, toasts],
  );

  const handleUpload = useCallback(
    async (data: UploadPrerecordingFormData) => {
      if (!data.start)
        return { start: _(msg({ message: "Start is required" })) };

      if (!data.file) return { file: _(msg({ message: "File is required" })) };

      return handleUploadAfterValidation(data.start, data.file);
    },
    [_, handleUploadAfterValidation],
  );

  return <UploadPrerecordingForm event={event} onUpload={handleUpload} />;
}
