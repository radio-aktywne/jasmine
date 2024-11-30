"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Pagination, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useListPrerecordings } from "../../../hooks/numbat/use-list-prerecordings";
import { useToasts } from "../../../hooks/use-toasts";
import { PrerecordingTile } from "./components/prerecording-tile";
import { PrerecordingListWidgetInput } from "./types";

export function PrerecordingListWidget({
  event: event,
  perPage = 5,
  prerecordings: prefetchedPrerecordings,
}: PrerecordingListWidgetInput) {
  const [page, setPage] = useState(1);

  const { _ } = useLingui();
  const toasts = useToasts();

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { data: currentPrerecordings, error } = useListPrerecordings({
    event: event,
    limit: limit,
    offset: offset,
  });
  const prerecordings = currentPrerecordings ?? prefetchedPrerecordings;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (prerecordings.count === 0) {
    return <Title>{_(msg({ message: "No prerecordings." }))}</Title>;
  }

  const pages = Math.ceil(prerecordings.count / perPage);

  return (
    <Stack>
      <Stack>
        {prerecordings.prerecordings.map((prerecording) => (
          <PrerecordingTile
            key={prerecording.start}
            prerecording={prerecording}
          />
        ))}
      </Stack>
      <Center>
        <Stack>
          <Pagination onChange={setPage} total={pages} value={page} withEdges />
          <Button component={Link} href={`/prerecordings/${event}/upload`}>
            {_(msg({ message: "Upload" }))}
          </Button>
        </Stack>
      </Center>
    </Stack>
  );
}
