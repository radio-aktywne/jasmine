import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const list = orpcServerRootBase.core.prerecordings.list.handler(
  async ({ errors, input }) => {
    const { event, ...query } = input;

    const { data: prerecordingsEventListData } =
      await state.current.apis.numbat.prerecordingsEventList({
        path: { event: event },
        query: mapValues(query ?? {}, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (prerecordingsEventListData === undefined)
      throw errors.INTERNAL_SERVER_ERROR();

    return prerecordingsEventListData;
  },
);
