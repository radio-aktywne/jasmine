import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listEventsPrerecordings } from "../../../actions/wrappers/list-events-prerecordings";
import {
  UseListEventsPrerecordingsInput,
  UseListEventsPrerecordingsOutput,
  UseListEventsPrerecordingsState,
} from "./types";

export function useListEventsPrerecordings({
  after,
  before,
  include,
  interval = 1000 * 5,
  limit,
  order,
  timezone,
  where,
}: UseListEventsPrerecordingsInput): UseListEventsPrerecordingsOutput {
  const [state, setState] = useState<UseListEventsPrerecordingsState>({
    loading: true,
  });

  useEffect(() => {
    setState({ loading: true });
  }, [after, before, include, limit, order, timezone, where]);

  const refresh = useCallback(async () => {
    const { data, error } = await listEventsPrerecordings({
      after: after,
      before: before,
      include: include,
      limit: limit,
      order: order,
      timezone: timezone,
      where: where,
    });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [after, before, include, limit, order, timezone, where]);

  const { start, stop } = useInterval(refresh, interval);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return useMemo(() => ({ ...state, refresh }), [state, refresh]);
}
