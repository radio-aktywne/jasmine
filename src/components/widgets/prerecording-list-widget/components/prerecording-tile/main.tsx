"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ActionIcon, Group, Title } from "@mantine/core";
import { IconDownload, IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

import { deletePrerecording } from "../../../../../actions/numbat/delete-prerecording";
import { useListPrerecordings } from "../../../../../hooks/numbat/use-list-prerecordings";
import { useToasts } from "../../../../../hooks/use-toasts";
import { PrerecordingTileInput } from "./types";

export function PrerecordingTile({ prerecording }: PrerecordingTileInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { refresh } = useListPrerecordings({ event: prerecording.event });

  const handleDelete = useCallback(async () => {
    const { error } = await deletePrerecording({
      event: prerecording.event,
      start: prerecording.start,
    });

    if (error) toasts.error(_(error));
    else toasts.success(_(msg({ message: "Prerecording deleted." })));

    void refresh();
  }, [_, prerecording, refresh, toasts]);

  return (
    <Group>
      <Title>{prerecording.start}</Title>
      <ActionIcon
        component="a"
        download={`${prerecording.event}-${prerecording.start}`}
        href={`/api/prerecordings/${prerecording.event}/${prerecording.start}`}
        variant="transparent"
      >
        <IconDownload />
      </ActionIcon>
      <ActionIcon color="red" onClick={handleDelete} variant="transparent">
        <IconTrash />
      </ActionIcon>
    </Group>
  );
}
