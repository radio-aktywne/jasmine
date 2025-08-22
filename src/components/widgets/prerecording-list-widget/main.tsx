"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import dayjs from "../../../dayjs";
import { useToasts } from "../../../hooks/use-toasts";
import { useListEventsPrerecordings } from "../../../hooks/wrappers/use-list-events-prerecordings";
import { DateRangeFilter } from "./components/date-range-filter";
import { PrerecordingItem } from "./components/prerecording-item";
import { PrerecordingListWidgetInput } from "./types";

export function PrerecordingListWidget({
  prerecordings: prefetchedPrerecordings,
  show,
  ...props
}: PrerecordingListWidgetInput) {
  const router = useRouter();

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

  const handleDateRangeChange = useCallback(
    (start: Date | null, end: Date | null, timezone: string | undefined) => {
      if (start == null && end == null)
        return router.push(`/shows/${show.id}/prerecordings`);

      if (start == null || end == null) return;

      const tz = timezone ?? dayjs.tz.guess();
      const after = dayjs.tz(start, tz);
      const before = dayjs.tz(end, tz);

      const params = new URLSearchParams({
        after: after.startOf("day").format("YYYY-MM-DD"),
        before: before.endOf("day").format("YYYY-MM-DD"),
        timezone: tz,
      });

      router.push(`/shows/${show.id}/prerecordings?${params}`);
    },
    [router, show.id],
  );

  return (
    <Stack mah="100%" w="100%">
      {prerecordings.events.length === 0 ? (
        <Center>
          <Title>{_(msg({ message: "No events." }))}</Title>
        </Center>
      ) : (
        <>
          <Center>
            <Title>{_(msg({ message: "Prerecordings" }))}</Title>
          </Center>
          <DateRangeFilter
            end={
              props.before
                ? dayjs.tz(props.before, props.timezone).toDate()
                : undefined
            }
            onDateRangeChange={handleDateRangeChange}
            start={
              props.after
                ? dayjs.tz(props.after, props.timezone).toDate()
                : undefined
            }
            timezone={props.timezone}
          />
          {prerecordings.prerecordings.length === 0 ? (
            <Center py="sm">
              <Text size="xs">{_(msg({ message: "No prerecordings" }))}</Text>
            </Center>
          ) : (
            <List style={{ overflowY: "auto" }}>
              {prerecordings.prerecordings.map((prerecording) => (
                <ListItem
                  key={`${prerecording.event.id}-${prerecording.start}`}
                >
                  <PrerecordingItem
                    onDelete={refresh}
                    prerecording={prerecording}
                    timezone={props.timezone}
                  />
                </ListItem>
              ))}
            </List>
          )}
          <Button
            component={Link}
            href={`/shows/${show.id}/prerecordings/upload`}
          >
            {_(msg({ message: "Upload" }))}
          </Button>
        </>
      )}
    </Stack>
  );
}
