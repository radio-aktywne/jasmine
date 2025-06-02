"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ActionIcon, Text } from "@mantine/core";
import { useCallback } from "react";
import { MdDelete, MdDownload } from "react-icons/md";

import { deletePrerecording } from "../../../../../actions/numbat/delete-prerecording";
import { useListPrerecordings } from "../../../../../hooks/numbat/use-list-prerecordings";
import { useToasts } from "../../../../../hooks/use-toasts";
import { PrerecordingItemInput } from "./types";

export function PrerecordingItem({ prerecording }: PrerecordingItemInput) {
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
    <>
      <Text fw="bold" size="xs">
        {prerecording.start}
      </Text>
      <ActionIcon
        component="a"
        download={`${prerecording.event}-${prerecording.start}`}
        href={`/api/prerecordings/${prerecording.event}/${prerecording.start}`}
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
