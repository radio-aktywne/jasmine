"use client";

import { msg } from "@lingui/core/macro";
import { Button, Stack, Title } from "@mantine/core";
import { matchQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import type { UploadPrerecordingWidgetInput } from "./types";

import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import {
  UploadPrerecordingForm,
  type UploadPrerecordingFormSubmitInput,
} from "./components/upload-prerecording-form";

export function UploadPrerecordingWidget({
  id,
}: UploadPrerecordingWidgetInput) {
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const initialValues = useMemo(() => ({}), []);

  const handleUpload = useCallback(
    async ({ values }: UploadPrerecordingFormSubmitInput) => {
      if (uploading) return;

      const { file, instance } = values;

      if (!file) {
        notifications.error({ message: msg({ message: "Invalid input" }) });
        return { errors: { file: msg({ message: "File is required" }) } };
      }

      if (!instance) {
        notifications.error({ message: msg({ message: "Invalid input" }) });
        return {
          errors: { instance: msg({ message: "Instance is required" }) },
        };
      }

      const [event, start] = instance.split("/") as [string, string];

      setUploading(true);

      try {
        const uploadResponse = await fetch(
          `/api/prerecordings/${event}/${start}`,
          { body: file, method: "PUT" },
        );

        if (!uploadResponse.ok) {
          if (uploadResponse.status === 400) {
            notifications.error({ message: msg({ message: "Invalid input" }) });
            return { errors: { file: msg({ message: "Invalid file" }) } };
          }

          notifications.error({
            message: msg({ message: "An unexpected error occurred" }),
          });
          return;
        }

        void queryClient.invalidateQueries({
          predicate: (query) =>
            matchQuery(
              {
                queryKey:
                  orpcClientSideQueryClient.core.composites.listShowPrerecordings.key(),
              },
              query,
            ) ||
            matchQuery(
              {
                queryKey:
                  orpcClientSideQueryClient.core.prerecordings.list.key(),
              },
              query,
            ),
        });

        notifications.success({
          message: msg({ message: "Prerecording uploaded" }),
        });

        router.push(`/shows/${id}/prerecordings`);

        return { values: { file: file, instance: instance } };
      } catch (error) {
        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });

        throw error;
      } finally {
        setUploading(false);
      }
    },
    [
      id,
      notifications.error,
      notifications.success,
      queryClient,
      router,
      uploading,
    ],
  );

  const handleError = useCallback(() => {
    notifications.error({ message: msg({ message: "Invalid input" }) });
  }, [notifications.error]);

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Upload prerecording" }))}
      </Title>
      <UploadPrerecordingForm
        id={id}
        initialValues={initialValues}
        onError={handleError}
        onSubmit={handleUpload}
      />
      <Button
        color="gray"
        component={Link}
        disabled={uploading}
        href={`/shows/${id}/prerecordings`}
        style={{ flexShrink: 0 }}
        variant="light"
      >
        {localization.localize(msg({ message: "Back" }))}
      </Button>
    </Stack>
  );
}
