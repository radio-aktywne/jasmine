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
  order,
  where,
}: UseListEventsPrerecordingsInput): UseListEventsPrerecordingsOutput {
  const [state, setState] = useState<UseListEventsPrerecordingsState>({
    loading: true,
  });

  const refresh = useCallback(async () => {
    const { data, error } = await listEventsPrerecordings({
      after: after,
      before: before,
      include: include,
      order: order,
      where: where,
    });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [after, before, include, order, where]);

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
