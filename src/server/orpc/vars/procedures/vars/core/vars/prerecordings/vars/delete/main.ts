import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const delete_ = orpcServerRootBase.core.prerecordings.delete.handler(
  async ({ errors, input }) => {
    const { event, start } = input;

    const {
      data: prerecordingsEventStartDeleteData,
      response: prerecordingsEventStartDeleteResponse,
    } = await state.current.apis.numbat.prerecordingsEventStartDelete({
      path: { event: event, start: start },
    });

    if (prerecordingsEventStartDeleteData === undefined) {
      if (prerecordingsEventStartDeleteResponse.status === 404)
        throw errors.NOT_FOUND();

      throw errors.INTERNAL_SERVER_ERROR();
    }
  },
);
