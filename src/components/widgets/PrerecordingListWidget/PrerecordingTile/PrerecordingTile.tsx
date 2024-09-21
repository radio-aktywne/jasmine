import { ActionIcon, Group, Title } from "@mantine/core";
import { IconDownload, IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";
import { deletePrerecording } from "../../../../actions";
import { useListPrerecordings, useToasts } from "../../../../hooks";
import { PrerecordingTileProps } from "./PrerecordingTile.types";

export function PrerecordingTile({
  prerecording,
  labels,
}: PrerecordingTileProps) {
  const { success, error } = useToasts();

  const { fetchData } = useListPrerecordings({ event: prerecording.event });

  const handleDelete = useCallback(async () => {
    const { error: deleteError } = await deletePrerecording({
      event: prerecording.event,
      start: prerecording.start,
    });

    if (deleteError !== undefined)
      error(labels.toasts.delete.error(prerecording.start));
    else success(labels.toasts.delete.success(prerecording.start));

    fetchData();
  }, [
    prerecording.event,
    prerecording.start,
    error,
    success,
    labels.toasts.delete,
    fetchData,
  ]);

  return (
    <Group>
      <Title>{labels.text(prerecording.start)}</Title>
      <ActionIcon
        variant="transparent"
        component="a"
        href={`/api/prerecordings/${prerecording.event}/${prerecording.start}`}
        download={`${prerecording.event}-${prerecording.start}`}
      >
        <IconDownload />
      </ActionIcon>
      <ActionIcon variant="transparent" color="red" onClick={handleDelete}>
        <IconTrash />
      </ActionIcon>
    </Group>
  );
}
