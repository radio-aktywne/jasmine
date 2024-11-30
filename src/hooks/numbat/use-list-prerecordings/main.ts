import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listPrerecordings } from "../../../actions/numbat/list-prerecordings";
import {
  UseListPrerecordingsInput,
  UseListPrerecordingsOutput,
  UseListPrerecordingsState,
} from "./types";

export function useListPrerecordings({
  after,
  before,
  event,
  interval = 1000 * 5,
  limit,
  offset,
  order,
}: UseListPrerecordingsInput): UseListPrerecordingsOutput {
  const [state, setState] = useState<UseListPrerecordingsState>({
    loading: true,
  });

  const refresh = useCallback(async () => {
    const { data, error } = await listPrerecordings({
      after: after,
      before: before,
      event: event,
      limit: limit,
      offset: offset,
      order: order,
    });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [after, before, event, limit, offset, order]);

  const { start, stop } = useInterval(refresh, interval);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return useMemo(() => ({ ...state, refresh }), [state, refresh]);
}
