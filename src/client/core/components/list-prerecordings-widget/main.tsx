"use client";

import type { Dayjs } from "dayjs";

import { msg, plural } from "@lingui/core/macro";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { ListPrerecordingsWidgetInput } from "./types";

import { LoadingWidget } from "../../../../common/core/components/generic/loading-widget";
import { createUrl } from "../../../../common/generic/lib/create-url";
import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { PrerecordingItem } from "./components/prerecording-item";
import { RangeFilter } from "./components/range-filter";
import { ShowFilter } from "./components/show-filter";

export function ListPrerecordingsWidget({
  show,
}: ListPrerecordingsWidgetInput) {
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null);

  const router = useRouter();

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const listShowPrerecordingsInput = useMemo(
    () => ({
      after: range?.[0].utc().format("YYYY-MM-DDTHH:mm:ss"),
      before: range?.[1].utc().format("YYYY-MM-DDTHH:mm:ss"),
      limit: range?.[0].isSame(range[1], "day") ? null : 10,
      order: "desc" as const,
      show: show,
    }),
    [range, show],
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

  const handleShowChange = useCallback(
    (value: null | string) => {
      router.push(
        createUrl({
          path: "/prerecordings",
          query: value ? { show: value } : undefined,
        }).url,
      );
    },
    [router],
  );

  const handleRangeChange = useCallback((range: [Dayjs, Dayjs] | null) => {
    setRange(range);
  }, []);

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

  const count = listShowPrerecordingsQuery.data?.count;
  const results = listShowPrerecordingsQuery.data?.results;
  const remaining =
    count !== undefined && results !== undefined
      ? count - results.length
      : undefined;

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
      <Group>
        <ShowFilter onShowChange={handleShowChange} show={show} />
        <RangeFilter defaultRange={range} onRangeChange={handleRangeChange} />
      </Group>
      {count === undefined ||
      results === undefined ||
      remaining === undefined ? (
        <LoadingWidget />
      ) : count === 0 ? (
        <Text py="sm" size="xs" ta="center">
          {localization.localize(msg({ message: "No prerecordings" }))}
        </Text>
      ) : (
        <>
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
          {remaining > 0 && (
            <Text c="dimmed" size="xs" ta="center">
              {localization.localize(
                msg({
                  message: plural(remaining, { other: "...and # more." }),
                }),
              )}
            </Text>
          )}
        </>
      )}
      <Button
        component={Link}
        href={
          createUrl({
            path: "/prerecordings/upload",
            query: show ? { show: show } : undefined,
          }).url
        }
        mt="auto"
        style={{ flexShrink: 0 }}
      >
        {localization.localize(msg({ message: "Upload" }))}
      </Button>
    </Stack>
  );
}
