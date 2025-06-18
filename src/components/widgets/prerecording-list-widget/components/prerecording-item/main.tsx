"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ActionIcon, Divider, Group, Text } from "@mantine/core";
import { useCallback } from "react";
import { MdDelete, MdDownload } from "react-icons/md";

import { deletePrerecording } from "../../../../../actions/numbat/delete-prerecording";
import { useLanguage } from "../../../../../hooks/use-language";
import { useToasts } from "../../../../../hooks/use-toasts";
import { PrerecordingItemInput } from "./types";
import {
  formatFilename,
  formatSizeText,
  formatStartDateText,
  formatStartTimeText,
} from "./utils";

export function PrerecordingItem({
  onDelete,
  prerecording,
}: PrerecordingItemInput) {
  const { _ } = useLingui();
  const toasts = useToasts();
  const { language } = useLanguage();

  const handleDelete = useCallback(async () => {
    const { error } = await deletePrerecording({
      event: prerecording.event.id,
      start: prerecording.start,
    });

    if (error) toasts.error(_(error));
    else toasts.success(_(msg({ message: "Prerecording deleted." })));

    onDelete?.();
  }, [_, onDelete, prerecording, toasts]);

  return (
    <>
      <Group gap="xs">
        <Text fw="bold" size="xs">
          {formatStartDateText(prerecording)}
        </Text>
        <Divider orientation="vertical" size="sm" />
        <Text fw="bold" size="xs">
          {formatStartTimeText(prerecording)}
        </Text>
        <Divider orientation="vertical" size="sm" />
        <Text fw="bold" size="xs">
          {formatSizeText(prerecording, language)}
        </Text>
      </Group>
      <ActionIcon
        component="a"
        download={formatFilename(prerecording)}
        href={`/api/prerecordings/${prerecording.event.id}/${prerecording.start}`}
        size="auto"
        variant="transparent"
      >
        <MdDownload size="1em" />
      </ActionIcon>
      <ActionIcon
        color="ra-red"
        onClick={handleDelete}
        size="auto"
        variant="transparent"
      >
        <MdDelete size="1em" />
      </ActionIcon>
    </>
  );
}
