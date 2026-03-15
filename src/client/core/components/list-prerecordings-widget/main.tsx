"use client";

import type { Dayjs } from "dayjs";

import { msg } from "@lingui/core/macro";
import { Button, Stack, Text, Title } from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { ListPrerecordingsWidgetInput } from "./types";

import { LoadingWidget } from "../../../../common/core/components/generic/loading-widget";
import { dayjs } from "../../../../common/dates/vars/dayjs";
import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { Controls } from "./components/controls";
import { PrerecordingItem } from "./components/prerecording-item";

export function ListPrerecordingsWidget({ id }: ListPrerecordingsWidgetInput) {
  const { localization } = useLocalization();

  const [now] = useState(dayjs().locale(localization.locale).local());
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>([
    now.subtract(1, "month").startOf("day"),
    now.add(1, "month").endOf("day"),
  ]);

  const { notifications } = useNotifications();

  const listShowPrerecordingsInput = useMemo(
    () => ({
      after: range ? range[0].utc().format("YYYY-MM-DDTHH:mm:ss") : undefined,
      before: range ? range[1].utc().format("YYYY-MM-DDTHH:mm:ss") : undefined,
      id: id,
    }),
    [id, range],
  );

  const listShowPrerecordingsQuery = useQuery(
    orpcClientSideQueryClient.core.composites.listShowPrerecordings.queryOptions(
      {
        input: listShowPrerecordingsInput,
      },
    ),
  );

  const prerecordingsDeleteMutation = useMutation(
    orpcClientSideQueryClient.core.prerecordings.delete.mutationOptions({
      meta: {
        awaits: [
          orpcClientSideQueryClient.core.composites.listShowPrerecordings.key({
            input: listShowPrerecordingsInput,
          }),
        ],
      },
    }),
  );

  const handleDelete = useCallback(
    async (event: string, start: string) => {
      try {
        await prerecordingsDeleteMutation.mutateAsync({
          event: event,
          start: start,
        });
      } catch (error) {
        if (isOrpcDefinedError(error) && error.code === "NOT_FOUND") {
          notifications.warning({
            message: msg({ message: "Prerecording already deleted" }),
          });
          return;
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });
        throw error;
      }

      notifications.success({
        message: msg({ message: "Prerecording deleted" }),
      });
    },
    [
      notifications.error,
      notifications.success,
      notifications.warning,
      prerecordingsDeleteMutation.mutateAsync,
    ],
  );

  const handleRangeChange = useCallback((range: [Dayjs, Dayjs] | null) => {
    setRange(range);
  }, []);

  const results = listShowPrerecordingsQuery.data?.results;

  const deleteHandlers = useDeepCompareMemo(
    () =>
      results?.map(
        (result) => async () =>
          await handleDelete(result.event.id, result.prerecording.start),
      ),
    [results, handleDelete],
  );

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Prerecordings" }))}
      </Title>
      <Controls defaultRange={range} onRangeChange={handleRangeChange} />
      {results === undefined ? (
        <LoadingWidget />
      ) : results.length === 0 ? (
        <Text py="sm" size="xs" ta="center">
          {localization.localize(msg({ message: "No prerecordings" }))}
        </Text>
      ) : (
        <List style={{ overflowY: "auto" }}>
          {results.map((result, index) => (
            <PrerecordingItem
              event={result.event}
              key={`${result.event.id}-${result.prerecording.start}`}
              onDelete={deleteHandlers?.[index]}
              prerecording={result.prerecording}
            />
          ))}
        </List>
      )}
      <Button
        component={Link}
        href={`/shows/${id}/prerecordings/upload`}
        mt="auto"
        style={{ flexShrink: 0 }}
      >
        {localization.localize(msg({ message: "Upload" }))}
      </Button>
    </Stack>
  );
}
