"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Center, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { useToasts } from "../../../hooks/use-toasts";
import { useListEventsInstances } from "../../../hooks/wrappers/use-list-events-instances";
import {
  UploadPrerecordingForm,
  UploadPrerecordingFormData,
} from "./components/upload-prerecording-form";
import { UploadPrerecordingWidgetInput } from "./types";

export function UploadPrerecordingWidget({
  instances: prefetchedInstances,
  show,
  ...props
}: UploadPrerecordingWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentInstances, error } = useListEventsInstances(props);
  const instances = currentInstances ?? prefetchedInstances;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleUploadAfterValidation = useCallback(
    async (instance: string, file: File) => {
      const [event, start] = instance.split("/");

      const response = await fetch(`/api/prerecordings/${event}/${start}`, {
        body: file,
        method: "PUT",
      });

      if (!response.ok) {
        const data = (await response.json()) as { error: string };
        const error = _(data.error);

        toasts.error(error);
        return { file: error, start: error };
      }

      toasts.success(_(msg({ message: "Prerecording uploaded successfully" })));
      router.push(`/shows/${show.id}/prerecordings`);
    },
    [_, router, show, toasts],
  );

  const handleUpload = useCallback(
    async (data: UploadPrerecordingFormData) => {
      if (!data.instance)
        return { instance: _(msg({ message: "Instance is required" })) };

      if (!data.file) return { file: _(msg({ message: "File is required" })) };

      return handleUploadAfterValidation(data.instance, data.file);
    },
    [_, handleUploadAfterValidation],
  );

  if (instances.length === 0)
    return (
      <Center>
        <Title>{_(msg({ message: "No event instances." }))}</Title>
      </Center>
    );

  return (
    <UploadPrerecordingForm instances={instances} onUpload={handleUpload} />
  );
}
