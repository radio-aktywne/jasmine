"use client";

import {
  Button,
  Center,
  Loader,
  Pagination,
  Stack,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { labels } from "../../../config/labels";
import { useGetEvent, useHydrated, useListPrerecordings } from "../../../hooks";
import { PrerecordingListWidgetProps } from "./PrerecordingListWidget.types";
import { PrerecordingTile } from "./PrerecordingTile";

export function PrerecordingListWidget({
  event: prefetchedEvent,
  prerecordings: prefetchedPrerecordings,
  page,
  perPage,
}: PrerecordingListWidgetProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hydrated = useHydrated();

  const { data: currentEvent } = useGetEvent({ id: prefetchedEvent.id });
  const event = currentEvent ?? prefetchedEvent;

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { data: currentPrerecordings } = useListPrerecordings({
    event: event.id,
    limit,
    offset,
  });
  const prerecordings = currentPrerecordings ?? prefetchedPrerecordings;

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", newPage.toString());
      router.push(pathname + "?" + newSearchParams.toString());
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    const pages = Math.ceil(prerecordings.count / perPage) || 1;
    if (page > pages) handlePageChange(pages);
  }, [prerecordings.count, page, perPage, handlePageChange]);

  if (!hydrated) return <Loader />;

  if (prerecordings.count === 0)
    return <Title>{labels.widgets.prerecordings.empty.text}</Title>;

  const pages = Math.ceil(prerecordings.count / perPage);

  return (
    <Stack>
      <Stack>
        {prerecordings.prerecordings.map((prerecording) => (
          <PrerecordingTile
            key={prerecording.start}
            prerecording={prerecording}
            labels={labels.widgets.prerecordings.tiles.prerecording}
          />
        ))}
      </Stack>
      <Center>
        <Stack>
          <Pagination
            value={page}
            onChange={handlePageChange}
            total={pages}
            withEdges
          />
          <Button component={Link} href={`/prerecordings/${event.id}/upload`}>
            {labels.widgets.prerecordings.buttons.upload.label}
          </Button>
        </Stack>
      </Center>
    </Stack>
  );
}
