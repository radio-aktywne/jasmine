"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ActionIcon, Center, Group, Stack, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useEffect } from "react";
import { MdUpload } from "react-icons/md";

import { useListPrerecordings } from "../../../hooks/numbat/use-list-prerecordings";
import { useToasts } from "../../../hooks/use-toasts";
import { PrerecordingItem } from "./components/prerecording-item";
import { PrerecordingListWidgetInput } from "./types";

export function PrerecordingListWidget({
  event: event,
  prerecordings: prefetchedPrerecordings,
}: PrerecordingListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentPrerecordings, error } = useListPrerecordings({
    event: event,
  });
  const prerecordings = currentPrerecordings ?? prefetchedPrerecordings;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (prerecordings.count === 0) {
    return <Title>{_(msg({ message: "No prerecordings." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Group>
          <Title>{_(msg({ message: "Prerecordings" }))}</Title>
          <ActionIcon
            component={Link}
            href={`/prerecordings/${event}/upload`}
            size="auto"
            variant="transparent"
          >
            <MdUpload size="2em" />
          </ActionIcon>
        </Group>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {prerecordings.prerecordings.map((prerecording) => (
          <ListItem key={prerecording.start}>
            <PrerecordingItem prerecording={prerecording} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
