import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listEventsInstances } from "../../../actions/wrappers/list-events-instances";
import {
  UseListEventsInstancesInput,
  UseListEventsInstancesOutput,
  UseListEventsInstancesState,
} from "./types";

export function useListEventsInstances({
  end,
  include,
  interval = 1000 * 5,
  order,
  start,
  where,
}: UseListEventsInstancesInput): UseListEventsInstancesOutput {
  const [state, setState] = useState<UseListEventsInstancesState>({
    loading: true,
  });

  useEffect(() => {
    setState({ loading: true });
  }, [end, include, order, start, where]);

  const refresh = useCallback(async () => {
    const { data, error } = await listEventsInstances({
      end: end,
      include: include,
      order: order,
      start: start,
      where: where,
    });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [end, include, order, start, where]);

  const { start: intervalStart, stop: intervalStop } = useInterval(
    refresh,
    interval,
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    intervalStart();
    return intervalStop;
  }, [intervalStart, intervalStop]);

  return useMemo(() => ({ ...state, refresh }), [state, refresh]);
}
