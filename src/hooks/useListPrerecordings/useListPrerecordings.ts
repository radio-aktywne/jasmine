import "client-only";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { ListPrerecordingsData, listPrerecordings } from "../../actions";
import { UseListPrerecordingsProps } from "./useListPrerecordings.types";

export function useListPrerecordings({
  interval = 1000 * 5,
  ...listPrerecordingsProps
}: UseListPrerecordingsProps) {
  const [data, setData] = useState<ListPrerecordingsData>();

  const serializedListPrerecordingsProps = JSON.stringify(
    listPrerecordingsProps,
  );

  const fetchData = useCallback(async () => {
    try {
      const parsedListPrerecordingsProps = JSON.parse(
        serializedListPrerecordingsProps,
      );
      const response = await listPrerecordings(parsedListPrerecordingsProps);
      if (response.error !== undefined) throw new Error(response.error);
      setData(response.data);
    } catch (error) {
      setData(undefined);
    }
  }, [serializedListPrerecordingsProps]);

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
