import "client-only";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { ListSchedulesData, listSchedules } from "../../actions";
import { UseListSchedulesProps } from "./useListSchedules.types";

export function useListSchedules({
  interval = 1000 * 5,
  ...listSchedulesProps
}: UseListSchedulesProps = {}) {
  const [data, setData] = useState<ListSchedulesData>();

  const serializedListSchedulesProps = JSON.stringify(listSchedulesProps);

  const fetchData = useCallback(async () => {
    try {
      const parsedListSchedulesProps = JSON.parse(serializedListSchedulesProps);
      const response = await listSchedules(parsedListSchedulesProps);
      if (response.error !== undefined) throw new Error(response.error);
      setData(response.data);
    } catch (error) {
      setData(undefined);
    }
  }, [serializedListSchedulesProps]);

  const { start, stop } = useInterval(fetchData, interval);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return { data, fetchData };
}
