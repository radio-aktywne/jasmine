"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Stack, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useEffect } from "react";

import { useToasts } from "../../../hooks/use-toasts";
import { useListEventsPrerecordings } from "../../../hooks/wrappers/use-list-events-prerecordings";
import { PrerecordingItem } from "./components/prerecording-item";
import { PrerecordingListWidgetInput } from "./types";

export function PrerecordingListWidget({
  prerecordings: prefetchedPrerecordings,
  show,
  ...props
}: PrerecordingListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const {
    data: currentPrerecordings,
    error,
    refresh,
  } = useListEventsPrerecordings(props);
  const prerecordings = currentPrerecordings ?? prefetchedPrerecordings;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  return (
    <Stack mah="100%" w={prerecordings.length === 0 ? undefined : "100%"}>
      {prerecordings.length === 0 ? (
        <Center>
          <Title>{_(msg({ message: "No prerecordings." }))}</Title>
        </Center>
      ) : (
        <>
          <Center>
            <Title>{_(msg({ message: "Prerecordings" }))}</Title>
          </Center>
          <List style={{ overflowY: "auto" }}>
            {prerecordings.map((prerecording) => (
              <ListItem key={`${prerecording.event.id}-${prerecording.start}`}>
                <PrerecordingItem
                  onDelete={refresh}
                  prerecording={prerecording}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Button component={Link} href={`/shows/${show.id}/prerecordings/upload`}>
        {_(msg({ message: "Upload" }))}
      </Button>
    </Stack>
  );
}
